import React from 'react'
import moment from 'moment';
import { logo, CHEF_TITLE, CHEF_NAME } from './consts';

export const DeclarationWithoutNotes = ({ student }: any) => {
    return (
        <table border={1} style={{border:'solid 1px #F00'}}>
            <tr><td>
            <p style={{ textAlign: "center" }}>
                <img style={{ width: '50px', height: '50px', margin: "auto" }} src={logo} />
                &nbsp;</p>
            <p style={{ textAlign: "center" }}>REPUBLICA DE ANGOLA<br />MINISTERIO DO ENSINO SUPERIOR<br />INSITUTO SUPERIOR POLITECTNICO DO BENGO</p>

            <h1 style={{ textAlign: "center" }}>DECLARAÇÃO</h1>
            <p>N/Ref: 00252/2023</p>
            <p>A faculdade acima citada do instituto Superior do Bengo declara que&nbsp; <b>{student.fullName}</b> natural de
                {student?.person?.birthPlaceAddress?.city} {student?.person?.birthPlaceAddress?.province}
                frequenta&nbsp; o {student?.enrollment?.classe?.grade}º Ano nesta faculdade o plano curicular&nbsp; da
                 licenciatura do curso de '#AGRONOMIA' matriculado sob o numero de estudante {student?.code}</p>
            <p>É tudo que me compete informar</p>
            <p>Departamento de Assuntos academicos da faculdade do Instituto Superior do Bengo aos {moment().format('DD [de] MMMM [de] YYYY')}</p>
            <p style={{ textAlign: "center" }}>&nbsp;</p>
            <p style={{ textAlign: "center" }}>&nbsp;</p>
            <p style={{ textAlign: "center" }}>O Chefe de departamento</p>
            <p style={{ textAlign: "center" }}>_____________________________</p>
            <p style={{ textAlign: "center" }}>{CHEF_NAME}<br />({CHEF_TITLE})</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>

            <p style={{ textAlign: "center", fontSize: 5 }}>Instituto Superior do bengo, Avenida 22 de maio, Caxito, bengo - Angola<br />
                Telefones n&ordm; 222 985 663, 222 985 236, E'mail: ispbengo@ispbengo.ao</p>
                </td></tr>
        </table>
    );
}
