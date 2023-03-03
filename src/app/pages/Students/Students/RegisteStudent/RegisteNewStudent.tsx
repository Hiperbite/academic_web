import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, FloatingLabel, ProgressBar, Row } from "react-bootstrap";
import { RegisterStudent } from './RegisterStudent';

export const RegisterNewStudent = () => {
  const { id } = useParams()
  const navigate = useNavigate();
  /*
  const {
    data: student,
    loading,
  } = useGetStudentData(params);
  const updateParams = (opts: any) => {
    setParams({ ...params, ...opts });
  }*/

  return (
    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
      <div className="az-content-breadcrumb">
        <span>Estudantes</span>
        <span>Candidatos</span>
        <span>Listagem</span>
      </div>
      <h2 className="az-content-title">Estudantes</h2>

      <h1>Inscrever novo estudante</h1>
      <hr className="mg-y-30" />

      <div className="card-body">

        <RegisterStudent/>
      </div>


    </div>
  )
}
