import React from "react";
import { useNavigate } from "react-router-dom";

import { ContactDataForm } from "../../../../../Common/Person/RegisterFrom/Forms/ContactDataForm";
import { toast } from "react-toastify";
import { Api, services } from "../../../../../../app/api/Api";

export const Step2 = ({ student }: any) => {

  const navigate = useNavigate()
  const onSubmit = async (data: any) => {
    const { response: { data: response, status } } = await Api.put({ service: services.common.contacts, id: student?.personId, data: data.contacts })
    if (status === 200) {
      toast.success('Contactos actualizados com sucesso');
      navigate('/students/show/' + student?.id);
    }
    else {
      toast.error('Não foi possive registar os contactos, por favor tente mais tarde');
    }
  }

  return (<ContactDataForm onSubmit={onSubmit} data={student} />)
};