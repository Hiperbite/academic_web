import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveContacts } from "../rootSlice";
import { Controls } from "../../../../Components/Controls";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";

import { ErrorMessage } from "../../../../Components/ErrorMessage";

export const Step2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const data = useSelector((state: any) => state)

  const [contacts, setContacts] = useState(data.contacts);
  const { register, handleSubmit,
    formState: { errors }, } = useForm({
        //defaultValues: data,
    })


  const current = 2
  const total = 5

  const onSubmit = ( {contacts} : any) => {
    
    dispatch(saveContacts(contacts))
    navigate("../step3");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <>
      {JSON.stringify(data)}
        {contacts.map((contact: any, i:number) => (
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Tipo de contacto"
                  className="mb-3">
                  <Form.Select aria-label="Default select example"  {...register("contacts[" + i + "].type")} >
                    <option value="EMAIL">E-mail</option>
                    <option value="WHATSAPP">WhatsApp</option>
                    <option value="TELEPHONE">Telefone</option>
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>

            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Descrição"
                  className="mb-3">
                  <Form.Control type="text" required {...register("contacts[" + i + "].descriptions")} />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col xs lg="1">
              <br />
              <Button variant="danger" type="button" onClick={() => { setContacts(contacts.filter((c: any, j: number) => j !== i)) }}>
                -
              </Button>
            </Col>
          </Row>
        ))}

      </>

      <Button variant="primary" type="button" onClick={() => setContacts([...contacts, ...[{}]])}>
        Add
      </Button>

      <Controls current={current} total={total} />
    </form>
  );
};