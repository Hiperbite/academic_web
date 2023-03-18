import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveAddress } from "../rootSlice";
import { saveData } from "../rootSlice";
import { Controls } from "../../../../Components/Controls";
import { AddressDataForm } from "../../../../Common/Person/RegisterFrom/Forms/AddressDataForm";
import { Api, services } from "../../../../../app/api/Api";
import { toast } from "react-toastify";

export const Step5 = ({ staff }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const { livingAddress, birthPlaceAddress }:any = staff?.person 

  const onSubmit = async (form: any) => {
    debugger
    const { livingAddress: updatedlivingAddress, birthPlaceAddress: updatedbirthPlaceAddress }: any = form

    const { response: { data: response, status } } =
      await Api.put(
        {
          service: services.common.address,
          data: {
            livingAddress: { ...livingAddress, ...updatedlivingAddress },
            birthPlaceAddress: { ...birthPlaceAddress, ...updatedbirthPlaceAddress },
            personId: staff?.person.id
          }
        })

    if (status === 200) {
      toast.success('Endereços actualizados com sucesso.');
      navigate('/staffs/show/' + staff?.id);
    }
    else {
      toast.error('Não foi possive salvar os endereços, por favor tente mais tarde');
    }
  }

  return (<AddressDataForm onSubmit={onSubmit} data={staff} />)
}