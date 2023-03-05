import './StudentEnrollment.scss'

import React, { useState } from 'react'
import { Button, Card, ListGroup, Modal, ProgressBar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import useAxiosFetch, { Api, services } from '../../../../app/api/Api'
import Paginate from '../../../Components/Paginate'

export const StudentEnrollment = ({ show, handleClose, student }: any) => {

    const [classy, setClassy] = useState<any>({})

    const data = { data: [] }
    const spanStyles = {
        'display': 'block',
        'color': '#999',
        'fontSize': '12px'
    }
    const onChange = (v: any) => {
        setClassy(v[0]);
    }
    const registeEnrollment = async () => {

        const final = await Api.post({
            service: services.student.enrollment, data:
            {
                studentId: student.id,
                enrollmentConfirmations: [{
                    classyId: classy.id
                }]
            }
        })
        handleClose()
    }

    return (
        <Modal
            show={show}
            size="lg"
            onHide={() => handleClose(false)}>
            <Modal.Header closeButton >
                <Modal.Title>Registar estudante <b>{student?.person?.firstName} {student?.person?.lastName}</b> Turma #{classy?.code}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListClassy setClassy={setClassy} selectedClass={classy} />
                <hr />

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose(false)}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={() => registeEnrollment()}>
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}




export const ListClassy = ({ setClassy, selectedClass }: any) => {
    //const [data, setData] = useState({})
    const navigate = useNavigate();
    const [params, setParams] = useState({ pageSize: 6, page: 1, 'where[isActive]': 1 });


    const { data, loading, isError } = useAxiosFetch(services.academic.class, params)

    const updateParams = (opts: any) => {
        setParams({ ...params, ...opts });
    }
    const persent = (classy: any) => Number((((classy?.activesEnrollments?.length ?? 1) / (classy?.classyRoom?.size ?? 1)) * 100).toFixed(2));


    const handleSetClass = (classy: any) => {
        if (persent(classy) >= 100) {
            alert('overload')
        } else {
            setClassy(classy)
        }
    }
    return (
        <div className="az-content-body pd-lg-l-40 d-flex flex-column">
            <div className="az-content-breadcrumb">
                <span>Academicos</span>
                <span>Turmas</span>
                <span>Listagem</span>
            </div>

            <h2 className="az-content-title">Turmas</h2>
            <div className='row'>
                <div className='col-md-6'>

                    <div className="az-content-label mg-b-5">Simple Table</div>
                    <p className="mg-b-20">Using the most basic table markup.</p>

                </div>
                <div className='col-md-6 text-right'>
                </div>
            </div>

            <hr className="mg-y-30" />

            <div className="table-responsive">
                <table className="table table-striped mg-b-0">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Turno</th>
                            <th>Ano</th>
                            <th>Sala</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((classy: any) => <tr  className={`overload_${persent(classy)}`} onClick={() => handleSetClass(classy)}>
                            <th scope="row">{classy.code}</th>

                            <td>{classy?.academicPeriod?.code ?? '-'}</td>
                            <td>{classy?.grade ? `${classy?.grade} º` : '-'}</td>
                            <td>{classy?.classyRoom?.code ?? '-'}</td>
                            <td>
                                {classy?.activesEnrollments?.length ?? '-'}/
                                {classy?.classyRoom?.size ?? '-'}</td>
                            <td>

                                <ProgressBar now={persent(classy)} label={`${persent(classy)}%`} />
                            </td>
                            <td>
                                {selectedClass?.id === classy?.id
                                    ? <Button onClick={() => setClassy({})} variant={'success'}><i className="fas fa-check"></i></Button>
                                    : <Button onClick={() => handleSetClass(classy)} variant={'xlight'}></Button>
                                }
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
            <nav aria-label="Page navigation">
                <div className="row">
                    <div className="col-md-6">
                        {data?.page}/{data?.pages} - {data?.total} registos
                    </div>
                    <div className="col-md-6">
                        <Paginate pages={data?.pages} updateParams={updateParams} params={params} />
                    </div>
                </div>
            </nav>
        </div>
    )
}
