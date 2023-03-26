import React from "react";
import { useNavigate } from "react-router-dom";

import { DocumentDataForm } from "../../../../../Common/Person/RegisterFrom/Forms/DocumentDataForm";
import { Api, services } from "../../../../../../app/api/Api";
import { toast } from "react-toastify";

export const Step3 = ({ staff }: any) => {
  const navigate = useNavigate()

  const onSubmit = async (data: any) => {
    const { response: { data: response, status } } = await Api.put({ service: services.common.documents, id: staff?.personId, data: data.documents })
    if (status === 200) {
      toast.success('Contactos actualizados com sucesso');
    }
    else {
      toast.error('Não foi possive registar os contactos, por favor tente masi tarde');
    }

    navigate('/staffs/show/' + staff?.id);
  }

  return (<DocumentDataForm onSubmit={onSubmit} data={staff} />)
};