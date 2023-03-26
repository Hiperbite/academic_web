import React from 'react'
import { Card, Modal } from 'react-bootstrap'
import { FormScheduleClassRegister } from './FormScheduleClassRegister'

export const ScheduleClassRegister = ({ show, handleClose, item, classe, updateParams }: any) => {

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Horarios na Turma #{classe?.code}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormScheduleClassRegister updateParams={updateParams} item={item} handleClose={handleClose} classe={classe} />
            </Modal.Body>
        </Modal>
    )
}