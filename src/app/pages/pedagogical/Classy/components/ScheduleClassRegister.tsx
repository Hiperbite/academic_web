import React, { useState } from 'react'
import { Button, Card, ListGroup, Modal } from 'react-bootstrap'
import Moment from 'react-moment'
import { Api, services } from '../../../../app/api/Api'
import { FormScheduleClassRegister } from './FormScheduleClassRegister'

export const ScheduleClassRegister = ({ show, handleClose,item, classy, updateParams }: any) => {

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