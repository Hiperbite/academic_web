import React from 'react'
import { Modal } from 'react-bootstrap'
import './Snipper.scss'
import snipper from "./Snipper.gif"
export const Snipper = ({ loading }: any) => {
    return (
        <Modal show={loading} className="Spinner" fullscreen={true}>
            <Modal.Body className='d-flex justify-content-center d-flex align-items-center'>
                <img src={snipper} />
            </Modal.Body>
        </Modal>
    )
}
