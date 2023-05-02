import axios from 'axios';
import { useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { Api, services } from '../../app/api/Api';

export const Autocomplete = ({ onChange, options: opts }: any) => {

    const [isLoading, setIsLoading] = useState(false)
    const [options, setOptions] = useState<any[]>([])

    return <>
        <AsyncTypeahead

            placeholder='Pesquisar por Estudante...'
            onChange={onChange}
            isLoading={isLoading}
            labelKey={({ code, person, entryCode }: any) => `${code ?? entryCode ?? '00000'} - ${person?.firstName} ${person?.otherName ?? ''} ${person?.lastName}`}
            onSearch={async (query) => {
                if (query.length < 3)
                    return;
                
                setIsLoading(true);

                try {
                    const { response: { data } } = await Api.get({ service: `${services.student.students}?q=${query}` });
                    setOptions(data)
                    setIsLoading(false)
                } catch (error: any) {
                    setOptions([])
                }

                setIsLoading(false)

            }}
            options={options}
        />
    </>
}
