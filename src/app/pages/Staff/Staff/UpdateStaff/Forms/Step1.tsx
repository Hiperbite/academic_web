import React from 'react'
import { useNavigate } from 'react-router-dom'

import { PersonalDataForm } from '../../../../Common/Person/RegisterFrom/Forms/PersonalDataForm'
import moment from 'moment'
import { Api, services } from '../../../../../app/api/Api'
import { toast } from 'react-toastify'

export const Step1 = ({ staff }: any) => {
    staff.person.birthDate = moment(staff.person.birthDate).toDate()
    const navigate = useNavigate()

    const onSubmit = async (form: any) => {
        const { response: { data: response, status } } = await Api.put({ service: services.common.persons, data: { ...form, id: staff?.person?.id } })
        if (status === 200) {
            toast.success('Dados Pessoais actualizados com sucesso');
        }
        else {
            toast.error('Não foi possive registar, por favor tente masi tarde');
        }

        navigate('/staffs/show/' + staff?.id);
    }

    return (<PersonalDataForm onSubmit={onSubmit} data={staff} />
    )
}
