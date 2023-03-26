import React from 'react'
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { PersonalDataForm } from '../../../../../Common/Person/RegisterFrom/Forms/PersonalDataForm'
import { savePerson } from '../rootSlice'

export const Step1 = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const onSubmit = (form: any) => {
        dispatch(savePerson(form))
        navigate("../step2")
    }

    return (<PersonalDataForm  onSubmit={onSubmit} data={{}} />
    )
}
