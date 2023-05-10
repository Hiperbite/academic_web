import React from 'react'
import { Table } from 'react-bootstrap'
import Moment from 'react-moment'
import { useNavigate } from 'react-router-dom'
import { allowed } from '../../../../app/api/auth/RequireAuth'

export const ListTableStudentEnrollment = ({ enrollments }: any) => {
    const navigate = useNavigate()
    const handleStudentClick = (enrollment: any) => {
        if (allowed('STUDENTS', 1))
            navigate("/students/show/" + enrollment?.student?.id)
    }
    return (
        <Table striped hover>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Sexo</th>
                    <th>Turma</th>
                    <th>Ano</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
                {enrollments?.map((enrollment: any) =>
                    <tr onClick={() => handleStudentClick(enrollment)}>
                        <th scope="row">{enrollment?.student?.code ?? enrollment?.student?.entryCode}</th>
                        <td>{enrollment?.student?.person?.fullName}</td>
                        <td>{enrollment?.student?.person?.gender}</td>

                        <td>{enrollment?.classe?.code}</td>
                        <td>{enrollment?.classe?.grade} º</td>

                        <td>
                            <Moment format="DD/MM/YYYY">
                                {enrollment?.student?.createdAt}
                            </Moment></td>
                    </tr>
                )}
                {enrollments.length === 0 ? <tr>
                    <td colSpan={6} className='text-center'>
                        <i className='fa fa-exclamation'></i> {' '}sem registos
                    </td>
                </tr> : null}
            </tbody>
        </Table>
    )
}
