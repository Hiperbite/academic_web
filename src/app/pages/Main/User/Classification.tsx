import React, { useState } from 'react'
import { ButtonGroup, Col, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useApi } from '../../../app/api/apiSlice';
import { services } from '../../../app/api/services';

import AssessmentStudents from '../Students/Students/AssessmentStudents'

export const Classification = () => {

  const [semester, setSemester] = useState<any>(0)

  const location = useLocation();

  const { me, refresh } = location.state;
  const { data: student } = useApi({ service: services.student.students.getAll, id: me?.person?.student?.id, params: { refresh, id: me?.person?.student?.id } })

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
      <AssessmentStudents student={student} years={isNaN(semester) ? [1, 2, 3, 4, 5] : [1]} semesters={isNaN(semester) ? [0, 1] : [semester]} /> : null
    }
  </>

  )
}
