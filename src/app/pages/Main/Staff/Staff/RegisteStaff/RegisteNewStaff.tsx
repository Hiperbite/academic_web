import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, FloatingLabel, ProgressBar, Row } from "react-bootstrap";
import { RegisterStudent } from './RegisterStaff';

export const RegisterNewStaff = () => {
  const { id } = useParams()
  const navigate = useNavigate();
  /*
  const {
    data: staff,
    loading,
  } = useGetStudentData(params);
  const updateParams = (opts: any) => {
    setParams({ ...params, ...opts });
  }*/

  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Pessoal</span>
        <span>Candidatos</span>
        <span>Registar</span>
      </div>
      <h2 className="az-content-title">Inscrever novo Pessoal</h2>

      <hr className="mg-y-30" />

      <div className="card-body">

        <RegisterStudent/>
      </div>


    </div>
  )
}
