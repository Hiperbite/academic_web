import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveDocuments } from "../rootSlice";
import { Controls } from "../../../../Components/Controls";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";

export const Step3 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const data = useSelector((state: any) => state.data)
  const { register, handleSubmit } = useForm()
  const [documents, setDocuments] = useState([{}]);

  const current = 3
  const total = 5

  const onSubmit = (documents: any) => {
    
    dispatch(saveDocuments(documents))
    navigate("../step4");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <>
        {documents.map((document: any, i) => (
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">


                <FloatingLabel
                  controlId="floatingInput"
                  label="Tipo de documento"
                  className="mb-3">
                  <Form.Select aria-label="Default select example" required   {...register("documents[" + i + "].type")} >
                    <option value="IDCARD">Bilhete de Identidade</option>
                    <option value="PASSPORT">Passaporte</option>
                    <option value="RESIDENCE_CARD">Cartao de residencia</option>
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>

            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">

                <FloatingLabel
                  controlId="floatingInput"
                  label="Numero"
                  className="mb-3">
                  <Form.Control type="text"    {...register("documents[" + i + "].descriptions")} />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Data de Emissão"
                  className="mb-3">
                  <Form.Control type="date" {...register("documents[" + i + "].issueDate")} />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Data de validade"
                  className="mb-3">
                  <Form.Control type="date"  {...register("documents[" + i + "].validationDate")} />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col xs lg="1">
              <br />
              <Button variant="danger" type="button" onClick={() => { ; setDocuments(documents.filter((c: any, j: number) => j !== i)) }}>
                -
              </Button>
            </Col>
          </Row>
        ))}

      </>

      <Button variant="primary" type="button" onClick={() => setDocuments([...documents, ...[{}]])}>
        Add
      </Button>

      <Controls current={current} total={total} />
    </form >
  );
};