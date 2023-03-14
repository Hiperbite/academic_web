import './StudentEnrollment.scss'

import React, { useState } from 'react'
import { Badge, Button, Card, ListGroup, Modal, ProgressBar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import useAxiosFetch, { Api, services } from '../../../../app/api/Api'
import Paginate from '../../../Components/Paginate'

export const StudentEnrollment = ({ show, handleClose, student }: any) => {

    const [classe, setClasse] = useState<any>({})

    const data = { data: [] }
    const spanStyles = {
        'display': 'block',
        'color': '#999',
        'fontSize': '12px'
    }
    const onChange = (v: any) => {
        setClasse(v[0]);
    }
    const registeEnrollment = async () => {

        const final = await Api.post({
            service: services.student.enrollment, data:
            {
                studentId: student.id,
                classeId: classe.id
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
                <Modal.Title>Registar estudante <b>{student?.person?.firstName} {student?.person?.lastName}</b> Turma #{classe?.code}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListClasse setClasse={setClasse} selectedClass={classe} />
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




export const ListClasse = ({ setClasse, selectedClass }: any) => {
    //const [data, setData] = useState({})
    const navigate = useNavigate();
    const [params, setParams] = useState({ pageSize: 6, page: 1, 'where[isActive]': 1 });


    const { data, loading, isError } = useAxiosFetch(services.academic.class, params)

    const updateParams = (opts: any) => {
        setParams({ ...params, ...opts });
    }
    const persent = (classe: any) => Number((((classe?.activeEnrollments?.length ?? 1) / (classe?.classeRoom?.size ?? 1)) * 100).toFixed(2));


    const handleSetClass = (classe: any) => {
        if (persent(classe) >= 100) {
            alert('overload')
        } else {
            setClasse(classe)
        }
    }
    return (<>
        <div className='row'>
            <div className='col-md-6'>
                <h2 className="az-content-title">Turmas</h2>
            </div>
            <div className='col-md-6 text-right'>
            </div>
        </div>

        <div className="table-responsive">
            <table className="table table-striped table-hover mg-b-0">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Turno</th>
                        <th>Ano</th>
                        <th>Curso</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data?.map((classe: any) => <tr className={`overload_${persent(classe)}`} onClick={() => handleSetClass(classe)}>
                        <th scope="row">{classe.code}</th>

                        <td>{classe?.period?.code ?? '-'}</td>
                        <td>{classe?.grade ? `${classe?.grade} º` : '-'}</td>
                        <td>{classe?.course?.code ?? '-'} - {classe?.course?.name ?? '-'}</td>
                        <td>
                            {classe?.activeEnrollments?.length}/
                            {classe?.classeRoom?.size ?? '-'}</td>
                        <td>

                            <ProgressBar now={persent(classe)} label={`${persent(classe)}%`} />
                        </td>
                        <td>
                            {selectedClass?.id === classe?.id
                                ? <Badge onClick={() => setClasse({})} bg={'success'}><i className="fa fa-check"></i></Badge>
                                : <Badge onClick={() => handleSetClass(classe)} bg={'xlight'}></Badge>
                            }
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>

        <Paginate pages={data?.pages} total={data?.total} updateParams={updateParams} params={params} />
    </>

    )
}
