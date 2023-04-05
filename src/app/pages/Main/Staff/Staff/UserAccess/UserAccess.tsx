import moment from 'moment';
import React, { useMemo, useState } from 'react'
import { Badge, Button, Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useApi } from '../../../../../app/api/apiSlice'
import { services } from '../../../../../app/api/services';
import './UserAccess.scss'
const permissionsLabels =
    ["STUDENTS"
        , "CANDIDATES"
        , "CLASS"
        , "CLASSIFICATION"
        , "STAFF"
        , "TABLES"
        , "ADMIN"
        , "ACADEMIC"
    ]

export const UserAccess = ({ staff }: any) => {
    const [user, setUser] = useState(staff?.person?.user ?? {});

    const navigate = useNavigate()
    const permissions = user?.permissions
    const setPermissions = (permissions: any) => setUser({ ...user, permissions })
    const { data, loading, error, resolve } = useApi({ service: services.common.users.update, id: user?.id, obj: user })

    useMemo(() => {
        if (data?.updatedAt) {
            navigate(0)
        }
    }, [data?.updatedAt, navigate])
    return (

        <div className="col-lg-8" id="UserAccess">
            <div className="card card-dashboard-pageviews">
                <div className="card-header">
                    <Row>
                        <Col>
                            <h3 className="">Acessos de suporte</h3>
                            <p className="card-text">...</p>
                        </Col>
                        <Col><Link className="nav-link" style={{ float: "right" }} to={`/staffs/update/${staff.id}/documents`}><i className="fa fa-edit"></i></Link></Col>
                    </Row>
                </div>
                <div className="card-body">
                    <Row>
                        <Col md={4}>Username:</Col><Col><b>{user?.username}</b></Col>
                    </Row>
                    <Row>
                        <Col md={4}>E-mail:</Col><Col><b>{user?.email}</b></Col>
                    </Row>
                    <Row>
                        <Col md={4}>Password:</Col><Col><b>***************</b> <ForgotPasswordCommand user={user} /></Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col md={4}>Tipo utilizador:</Col><Col><b>{user?.role}</b></Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col md={4}>Permissões:</Col><Col>
                            {permissionsLabels?.map((label: string) => <PermissionBox setPermissions={setPermissions} permissions={permissions} label={label} />)}
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col md={4}></Col><Col className='text-right'><Button variant='success' onClick={resolve}><i className='fa fa-save'></i> Salvar</Button></Col>
                    </Row>

                </div>
            </div>

        </div>
    )
}

const ForgotPasswordCommand = ({ user }: any) => {

    const { data, loading, error, resolve } = useApi({ service: services.common.auth.forgotPassword, obj: user })

    useMemo(() => {
        if (typeof data === 'string') {
            alert(data)
        }
    }, [data])
    return <Button variant='secondary' onClick={() => resolve({ form: { email: user?.email } })} className='pull-right'><i className='fa fa-refresh'></i> Resedefinir palavra-passe</Button>
}

const PermissionBox = ({ label, setPermissions, permissions }: any) => {

    let current: any = Object.keys(permissions).filter((k: string) => k === label)[0]
    const value = permissions[current] ?? 0;
    current = value > 0 ? current : null
    return <Button onClick={() => setPermissions({ ...permissions, ...{ [label]: value === 4 ? 0 : (value + 1) } })} variant={current ? "primary" : 'outline-primary'}>
        {label} {current ? <Badge bg="light" text='dark'>{value}</Badge> : null}
        <span className="visually-hidden">unread messages</span>
    </Button>
}