import _ from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import Moment from 'react-moment'
import { DocHeader } from './DocHeader'

export const StudentData = ({ student }: any) => {
    const [contacts, setContacts] = useState<any>()
    useEffect(() => setContacts(_.chain(student?.contacts)
        .groupBy("type")
        .map((value, key) => ({ type: key, contacts: value }))
        .value()), [student?.contacts])

    return (
        <div>
            <DocHeader />

            <Table style={{ fontSize: '10px !important' }} >
                <tr>

                    <td colSpan={2}>
                        <h3>FICHA DE {student?.code ? 'ESTUDANTE' : 'CANDIDATO'} #{student?.code ? student?.code : student?.entryCode}</h3>
                        Data de Registo: <b><Moment format="DD [de] MMMM [de] YYYY">{student?.createdAt}</Moment> </b>
                    </td>
                    <td colSpan={1}>
                        <small className='pull-right'>{moment().format("dddd[,] DD [de] MMMM [de] YYYY, [as] HH:mm")}</small>
                    </td>
                </tr>
                <tr>
                    <th rowSpan={4}>Dados Pessoais</th>
                    <td colSpan={2}>
                        Primeiro Nome<br />
                        <b>{student?.person?.firstName} {student?.person?.otherNames}  {student?.person?.lastName}</b>
                    </td>
                </tr>
                <tr>
                    <td>
                        Sexo<br />
                        <b>
                            {student?.person?.gender}
                        </b>
                    </td>
                    <td>
                        Estado Civil<br />
                        <b>{student?.person?.maritalStatus}</b>
                    </td>
                </tr>
                <tr>
                    <td>
                        Data de Nascimento<br />
                        <b>
                            <Moment format="DD [de] MMMM [de] YYYY">{student?.person?.birthDate}
                            </Moment>
                        </b>
                    </td>
                    <td>
                        Idade<br />
                        <b>
                            {moment(student?.person?.birthDate).fromNow()}
                        </b>
                    </td>
                </tr>
                <tr>
                    <td>
                        Morada<br />
                        <b>

                            {student?.person?.livingAddress?.address}
                            {student?.person?.livingAddress?.city}
                        </b> Provincia:
                        <b>{student?.person?.livingAddress?.province}</b>
                    </td>
                    <td>
                        Local de Nascimento<br />
                        <b>
                            {student?.person?.birthPlaceAddress?.address}
                            {student?.person?.birthPlaceAddress?.city}
                        </b>
                        Provincia: <b>{student?.person?.birthPlaceAddress?.province}</b>
                    </td>
                </tr>
                {student?.code ? <>
                    <tr>
                        <th rowSpan={3}>Dados Academicos</th>
                        <td>
                            Ano<br />
                            <b>{student?.enrollment?.classe?.grade} º </b>
                        </td>
                        <td>
                            Semestre<br />
                            <b>{student?.enrollment?.classe?.semester} º </b>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Turma<br />
                            <b>{student?.enrollment?.classe?.code} </b>
                        </td>
                        <td>
                            Periodo<br />
                            <b>{student?.enrollment?.classe?.period?.descriptions} </b>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Curso<br />
                            <b>{student?.enrollment?.classe?.course?.code} {student?.enrollment?.classe?.course?.name}  </b>
                        </td>
                        <td>
                            Data de Matricula<br />
                            <b><Moment format="DD [de] MMMM [de] YYYY">{student?.enrollment?.createdAt}</Moment> </b><br />
                            Data de Registo<br />
                            <b><Moment format="DD [de] MMMM [de] YYYY">{student?.createdAt}</Moment> </b>
                        </td>
                    </tr>
                </> : null}
                <tr>
                    <th>Contactos</th>
                    <td colSpan={2}>
                        {contacts?.map(({ type, contacts }: any, i: number) => <>

                            <div style={{ width: '50%', float: 'left' }}>
                                {type}<br />
                                {contacts.map(({ descriptions }: any) => <><b>{descriptions}</b><br /></>)}

                            </div>

                        </>
                        )}
                    </td>
                </tr>

                <tr>
                    <th rowSpan={1}>Curso desejado</th>
                    <td colSpan={2}>
                        Primeira Opção<br />
                        <b>{student?.desiredCourse?.code} - {student?.desiredCourse?.name}</b>
                    </td>
                </tr>

                <tr>
                    <th rowSpan={1}>Documentos</th>

                    {student?.person?.documents?.map((document: any) =>
                        <td>
                            {document?.type}<br />
                            Numero: <b>{document?.number ?? document?.descriptions ?? '-'}</b><br />
                            Data de Emissão:
                            {document?.issueDate ?
                                <b><Moment format="DD [de] MMMM [de] YYYY">
                                    {document?.issueDate}
                                </Moment></b>
                                : '-'}<br />
                            Data de validade:
                            {document?.validationDate ?
                                <b><Moment format="DD [de] MMMM [de] YYYY">
                                    {document?.validationDate}
                                </Moment></b>
                                : '-'}

                        </td>)}

                </tr>
            </Table>
            <DocHeader />
        </div>
    )
}
