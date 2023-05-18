
import React from 'react'
import { Button, ButtonGroup, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { HtmlDocument } from '../../../../Components/PDF/HtmlToPdf';
import { renderToString } from 'react-dom/server'
import { DeclarationWithoutNotes } from './Template/DeclarationWithoutNotes';
import { DeclarationWithNotes } from './Template/DeclarationWithNotes';
import ReactDOMServer from 'react-dom/server';
const docTypes = [
    'Declaração sem Notas',
    'Declaração com Notas',
    'Histórico com Notas ',
    'Cartão de Estudante '
]
const style=`<style>
*{
  background: darkgreen;
  color: white;
  font-size: 8px;
  font-family: arial,sans;
}
pre {
  background-color: #eee;
  padding: 8px;
}
</style>`

export const Documents = ({ student }: any) => {


    const Template=[DeclarationWithoutNotes,DeclarationWithNotes][0]
    const template=renderToString(<Template student={student} />)
    const html = ReactDOMServer.renderToStaticMarkup(<Template student={student} />);
    return (<>
        <Row>
            <Col>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
            </Col>
            <Col>
                <FloatingLabel controlId="floatingSelect" label="Tipo de documento">
                    <Form.Select aria-label="Floating label select example">
                        <option></option>
                        {docTypes.map((m: string, i: number) =><option value={i}>{m}</option>)}

                    </Form.Select>
                </FloatingLabel>
            </Col>
            <Col md={6}>
                <ButtonGroup aria-label="Basic example">
                    {docTypes.map((m: string, i: number) =>
                        <Button variant="secondary">{m}</Button>)}
                </ButtonGroup>
            </Col>
        </Row>

        <HtmlDocument>
            {'<html>'+style+'<body>'+html+'</body></html>'}
        </HtmlDocument>

    </>)
}
