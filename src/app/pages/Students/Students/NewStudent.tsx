import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, FloatingLabel, ProgressBar, Row } from "react-bootstrap";
import { RegisteStudent } from './RegisteStudent/RegisteStudent';

export const NewStudent = () => {
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
      <h2 className="az-content-title">Candidatos Inscritos</h2>

      <div className="az-content-label mg-b-5">Simple Table</div>
      <p className="mg-b-20">Using the most basic table markup.</p>

      <hr className="mg-y-30" />

      <div className="card-body">

        <RegisteStudent />
      </div>


    </div>
  )
}
