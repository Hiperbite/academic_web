import React, { useMemo, useState } from 'react'
import { useLocation, useOutletContext } from 'react-router-dom';
import { Api, services } from '../../app/api/Api'
import AssessmentStudents from '../Students/Students/AssessmentStudents'

export const Classification = () => {

  const [student, setStudent] = useState<any>()
  
  const location = useLocation();
  
  
  const {me, refresh} = location.state;

  useMemo(async () => {

    const { response: { data: response } } = await Api.get({ service: '/users', id: me?.id })

    const { response: { data:  students  } } = await Api.get({ service: services.student.students, id:response?.person?.student?.id})
    setStudent(students)

  }, [me?.id, refresh])
  return (<>{student ? 
    <AssessmentStudents student={student} /> : null}</>
    
  )
}
