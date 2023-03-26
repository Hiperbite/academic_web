import React from 'react'
import { Modal } from 'react-bootstrap'
import './Spinner.scss'
import spinner from "./Spinner.svg"
export const Spinner = ({ loading }: { loading: boolean }) => {
    return (
        <Modal show={loading} className="Spinner" fullscreen={true}>
            <Modal.Body className='d-flex justify-content-center d-flex align-items-center'>
                <img src={spinner} />
            </Modal.Body>
        </Modal>
    )
}

export const Loading = ({ loading }: { loading: boolean }) => <>{loading ? <div style={{padding:"5%"}} className='Spinner d-flex justify-content-center d-flex align-items-center'><img src={spinner} /></div > : <></>}</>