import React, { useMemo, useState } from 'react'
import { Card, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import Moment from 'react-moment'
import { useLocation, useOutletContext } from 'react-router-dom'
import { Api } from '../../../../app/api/Api'

export const HomeUserProfile = () => {

  const location = useLocation()

  const { me: m, refresh, classe } = location.state ?? {};
  const me = m ?? JSON.parse(localStorage.getItem('user') ?? '');
  return (
    <>
      <Card>
        <Card.Header>
          <Row>
            <Col></Col>
            <Col className='text-right'>
              <i className='fa fa-edit'></i>
            </Col>
          </Row>
        </Card.Header>
        <ListGroup variant='flush'>
          <ListGroupItem>Nome:<br /><h5>{me?.person?.fullName}</h5></ListGroupItem>
          <ListGroupItem>Sexo:<br /><b>{me?.person?.gender}</b></ListGroupItem>
          <ListGroupItem>Estado Civil:<br /><b>{me?.person?.maritalStatus}</b></ListGroupItem>
          <ListGroupItem>Data de Nascimento:<br /><b><Moment format='DD/MM/YYYY'>{me?.person?.birthDate}</Moment></b></ListGroupItem>
        </ListGroup>
      </Card>
      <hr />
      <Card>
        <Card.Header>
          <Row>
            <Col></Col>
            <Col className='text-right'>
              <i className='fa fa-edit'></i>
            </Col>
          </Row>
        </Card.Header>
        <ListGroup variant='flush'>
          <ListGroupItem>Morada:<br /><b>{me?.person?.livingAddress?.address}, {me?.person?.livingAddress?.city}, {me?.person?.livingAddress?.province}</b></ListGroupItem>
          <ListGroupItem>Naturaliade:<br /><b>{me?.person?.birthPlaceAddress?.address}, {me?.person?.birthPlaceAddress?.city}, {me?.person?.birthPlaceAddress?.province}</b></ListGroupItem>
        </ListGroup>
      </Card>
      <hr />
      <Card>
        <Card.Header>
          <Row>
            <Col></Col>
            <Col className='text-right'>
              <i className='fa fa-edit'></i>
            </Col>
          </Row>
        </Card.Header>
        <ListGroup variant='flush'>
          {me?.person?.contacts?.map((contact: any) => <ListGroupItem>{contact?.type}:<br /><b>{contact?.descriptions}</b></ListGroupItem>)}
        </ListGroup>
      </Card>


    </>
  )
}
