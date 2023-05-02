

import { Controller, useForm } from 'react-hook-form'
import { Button, Card, Col, FloatingLabel, Form, InputGroup, Row } from 'react-bootstrap'
import { BasicControls, Controls } from '../../../../Components/Controls'

import { z } from "zod";
import { ErrorMessage } from '../../../../Components/ErrorMessage'

import DatePicker from 'react-date-picker'
import moment from 'moment'
import { zodResolver } from '@hookform/resolvers/zod';
import { Autocomplete } from '../../../Components/Autocomplete';
import { useApi } from '../../../../../app/api/apiSlice';
import { services } from '../../../../../app/api/services';
import { useState } from 'react';
import { Avatar } from '../../../User/components/Avatar/Avatar';
import { Link } from 'react-router-dom';


const FormSchema = z.object({
    firstName: z.string().min(3).max(20),
    lastName: z.string().min(3).max(20),
    otherNames: z.string().max(20).optional().nullable(),
    gender: z.string(),
    nationality: z.string(),
    maritalStatus: z.string(),
    birthDate: z.date().max((new Date(new Date().setFullYear(new Date().getFullYear() - 10))), { message: "Too young!" })

});
export const RegisterStudentToClass = () => {

    const data: any = {};
    const [student, setStudent] = useState<any>()
    const [period, setPeriod] = useState<any>()
    const [semester, setSemester] = useState<any>()
    const { data: fullStudent, loading } = useApi({ service: services.student.students.getAll, id: student?.id ?? '090as' })
    const { data: fullPeriods } = useApi({ service: services.academic.period.getAll, params: { pageSize: 100 } })
    const { register, handleSubmit, control,
        formState: { errors }, } = useForm({
            resolver: zodResolver(FormSchema)
        })
    const current = 1, total = 5;
    const onChange = (student: any) => {
        setStudent(student[0])
    }
    const semesters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const onSubmit = () => { }
    return (<>
        <h1>{'... '}</h1>
        <h1>Matricular estudante</h1>
        <h1>{' '}.</h1>
        <pre style={{ width: '200px', overflow: 'scroll' }}>{JSON.stringify(semester, null, 1)}</pre>
        <form onSubmit={handleSubmit(onSubmit)} >
            <Row>
                <Col>
                    <Autocomplete options={data?.data} onChange={onChange} />
                </Col>
                <Col>
                    {student ?
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col md={4}>
                                        {student ? <Avatar canUpdate={false} avatar={student?.person?.user?.avatar} user={student?.person?.user} /> : null}

                                    </Col>
                                    <Col>
                                        <i className='fa fa-times pull-right' onClick={() => setStudent(null)}></i>
                                        <span>Número:</span>
                                        <h6>#{student?.code ?? student?.entryCode}</h6>
                                        <span>Nome completo:</span>
                                        <h6>{student?.person?.fullName}</h6>
                                        <span>{student?.person?.idcard?.type}</span>
                                        <h6>{student?.person?.idcard?.type}</h6>
                                        <h6>{student?.person?.idcard?.number}</h6>
                                        <h6>{student?.person?.idcard?.validationDate}</h6>
                                        <Link to={'/students/show/' + student?.id}></Link><Button> Ver mais</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card> : null}
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Semestre">
                                <Form.Select aria-label="Default select example"
                                    onChange={(e:any)=>setSemester(e.currentValue)}
                                >
                                    <option disabled></option>
                                    {semesters.map((i: number) => <option>{i}</option>)}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Periodo">
                                <Form.Select aria-label="Default select example"
                                    onChange={(e:any)=>setPeriod(e.currentValue)}
                                >
                                <option disabled></option>
                                    {fullPeriods?.map((period: any) => <option value="AO">{period?.code} - {period?.descriptions}</option>)}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Col>
                <Col></Col>
            </Row>
            {data?.id ? <BasicControls /> : <Controls current={current} total={total} />}

        </form>
    </>
    )
}