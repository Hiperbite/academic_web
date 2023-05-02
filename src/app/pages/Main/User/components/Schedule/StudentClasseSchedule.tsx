import React, { useState } from 'react'
import { Button, ButtonGroup, Card, Col, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { Loading } from '../../../Components/Snipper/Spinner';
import { ScheduleClass, ScheduleType } from '../../../pedagogical/Classe/components/ScheduleClass/ScheduleClass'

export const StudentClasseSchedule = () => {
  const location = useLocation()
  const [type, setType] = useState<ScheduleType>('LIST')
  const { me, refresh, classe } = location.state;
  return <>
    <Row>
      <Col className='text-right'>
        <ButtonGroup className="me-2" aria-label="First group">
          <Button variant="secondary" active={type === 'LIST'} onClick={() => setType('LIST')}>
            <i className="fa fa-bars"></i>
          </Button>{' '}
          <Button variant="secondary" active={type === 'TABLE'} onClick={() => setType('TABLE')}>
            <i className="fa fa-table"></i>
          </Button>{' '}
        </ButtonGroup>
      </Col>
    </Row>
    <Card>
      <Card.Body>
        {(classe ? <ScheduleClass type={type} classe={classe} /> : null) ?? <Loading loading={true} />}
      </Card.Body>
    </Card>

  </>
}
