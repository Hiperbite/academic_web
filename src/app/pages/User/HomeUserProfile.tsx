import React, { useMemo, useState } from 'react'
import { Card, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import Moment from 'react-moment'
import { useOutletContext } from 'react-router-dom'
import { Api } from '../../app/api/Api'

export const HomeUserProfile = () => {
  const [me, setRefresh] = useOutletContext<any>();
  return (
    <>
      <Row>
        <Col>
          <Row>
            <Col>
              <Card>
                <Card.Header>Title</Card.Header>
                <Card.Body>
                  <ListGroup>
                    <ListGroupItem>Nome:<br /><b>{me?.person?.fullName}</b></ListGroupItem>
                    <ListGroupItem>Sexo:<br /><b>{me?.person?.gender}</b></ListGroupItem>
                    <ListGroupItem>Estado Civil:<br /><b>{me?.person?.maritalStatus}</b></ListGroupItem>
                    <ListGroupItem>Data de Nascimento:<br /><b><Moment format='DD/MM/YYYY'>{me?.person?.birthDate}</Moment></b></ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>

                <Card.Header>Enderecos</Card.Header>
                <Card.Body>
                  <ListGroup>
                    <ListGroupItem>Morada:<br/><b>{me?.person?.livingAddress?.address}, {me?.person?.livingAddress?.city}, {me?.person?.livingAddress?.province}</b></ListGroupItem>
                    <ListGroupItem>Naturaliade:<br/><b>{me?.person?.birthPlaceAddress?.address}, {me?.person?.birthPlaceAddress?.city}, {me?.person?.birthPlaceAddress?.province}</b></ListGroupItem>
                    
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={4}><Card> ... </Card></Col>

      </Row>
    </>
  )
}
