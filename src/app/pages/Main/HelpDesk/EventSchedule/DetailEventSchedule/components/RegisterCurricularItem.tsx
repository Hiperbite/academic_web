
import React from 'react'
import { Modal } from 'react-bootstrap'
import { FormRegisterCurricularItem } from './FormRegisterCurricularItem'

export const RegisterCurricularItem = ({ show, updateParams, handleClose, item, curricularPlan }: any) => {
    return (
        <Modal
            show={show}
            
            onHide={() => handleClose(false)}>
            <Modal.Header closeButton >
                <Modal.Title>Adicionar disciplina ao plano curricular de <b>{curricularPlan?.course?.name} </b></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormRegisterCurricularItem item={item} handleClose={handleClose} updateParams={updateParams} curricularPlan={curricularPlan} />
            </Modal.Body>
        </Modal>
    )
}


