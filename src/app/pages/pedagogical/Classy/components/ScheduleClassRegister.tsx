import React from 'react'
import { Card, Modal } from 'react-bootstrap'
import { FormScheduleClassRegister } from './FormScheduleClassRegister'

export const ScheduleClassRegister = ({ show, handleClose, item, classy, updateParams }: any) => {

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Horarios na Turma #{classy?.code}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card >
                    <Card.Body>
                        <FormScheduleClassRegister updateParams={updateParams} item={item} handleClose={handleClose} classy={classy} />
                    </Card.Body>
                </Card>
            </Modal.Body>
        </Modal>
    )
}