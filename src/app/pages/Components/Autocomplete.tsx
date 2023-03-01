import axios from 'axios';
import { useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { Api, services } from '../../app/api/Api';

export const Autocomplete = ({ onChange, options: opts }: any) => {

    const [isLoading, setIsLoading] = useState(false)
    const [options, setOptions] = useState<any[]>([])

    return <>
        <AsyncTypeahead

            onChange={onChange}
            isLoading={isLoading}
            labelKey={({ code, person }: any) => `${code} - ${person?.firstName} ${person?.otherName ?? ''} ${person?.lastName}`}

            onSearch={async (query) => {
                if (query.length < 3)
                    return;
                setIsLoading(true);

                try {
                    Api.get({ service: `${services.student.students}?q=${query}` })
                        .then(({ response }: any) => {
                            setOptions(response?.data)
                            setIsLoading(false)
                        });
                } catch (error: any) {
                    setOptions([])
                }

                setIsLoading(false)

            }}
            options={options}
        />
    </>
}
