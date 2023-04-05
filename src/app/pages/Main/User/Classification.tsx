import React, { useMemo, useState } from 'react'
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import { useLocation, useOutletContext } from 'react-router-dom';
import { Api, services } from '../../app/api/Api'
import AssessmentStudents from '../Students/Students/AssessmentStudents'

export const Classification = () => {

  const [student, setStudent] = useState<any>()
  const [semester, setSemester] = useState<any>(0)

  const location = useLocation();


  const { me, refresh } = location.state;

  useMemo(async () => {
    const { response: { data: students } } = await Api.get({ service: services.student.students, id: me?.person?.student?.id })
    setStudent(students)

  }, [me?.id, refresh])
  return (<>
    <Row>
      <Col><h3>Notas</h3></Col>
      <Col className='text-right'>
        Semestre{' '}
        <ButtonGroup className="me-2" aria-label="First group">
          <select className='form-control' onChange={(e) => setSemester(Number(e?.target?.value))}>
            <option>*</option>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i: number) => <option selected={i === semester} value={i}>{i + 1} </option>)}
          </select>
        </ButtonGroup>
      </Col>
    </Row>
    {student ?
      <AssessmentStudents student={student} years={isNaN(semester)?[1,2,3,4,5]:[1]} semesters={isNaN(semester)?[0,1]:[semester]} /> : null
    }
  </>

  )
}
