import React, { useEffect, useRef } from 'react'
import { Modal } from 'react-bootstrap'
import './Spinner.scss'
import spinner from "./Spinner.svg"

import LoadingBar from 'react-top-loading-bar'


export const Spinner = ({ loading }: { loading: boolean }) => {
    return (
        <Modal show={loading} className="Spinner" fullscreen={true}>
            <Modal.Body className='d-flex justify-content-center d-flex align-items-center'>
                <img src={spinner} />
            </Modal.Body>
        </Modal>
    )
}

export const ProgressiveLoadingBar = ({ loading }: any) => {

    const ref: any = useRef(null)

    useEffect(() => {
        if (loading) {
            ref.current.continuousStart()
        }
        else {
            ref.current.complete()
        }
    }, [loading])
    return (<>
        <LoadingBar color="#dde3f4" style={{ height: '5px' }} ref={ref} shadow={true} />
        <LoadingBar color="#5b47fb" style={{ height: '5px' }} ref={ref} shadow={true} />
        </>
    )
}

export const Loading = ({ loading }: { loading: boolean }) => <>{loading ? <div style={{ padding: "5%" }} className='Spinner d-flex justify-content-center d-flex align-items-center'><img src={spinner} /></div > : <></>}</>