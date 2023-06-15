import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import { useApi } from "../../../app/api/apiSlice"
import services from "../../../app/api/services"
import { Calendar } from "../Dashboard/gadgets/Calendar"
import { PedagogicalSchedule } from "../Dashboard/gadgets/PedagogicalSchedule"
const e = [
    {
        start: '2023-04-13T10:00:00',
        end: '2023-04-15T16:00:00',
        title: 'The Title', // a property!
    },
    {
        start: '2023-04-18T10:00:00',
        end: '2023-04-18T16:00:00',
        title: 'The Title', // a property!
    }, {
        start: '2023-04-18T12:30:00',
        end: '2023-04-18T16:00:00',
        title: 'The Title', // a property!
    }, {
        start: '2023-04-19T12:30:00',
        allDay: true,
        title: 'The Title', // a property!
    },
]
export const Pedagogical = () => {

    const [events, setEvents] = useState(e)
    const [refresh, setRefresh] = useState()
    const { data: { data: schedules } = {}, loading } =
        useApi({ service: services.helpDesk.eventSchedules.get, params: { refresh, pageSize: 100 } })

    useEffect(() => {
        setEvents(schedules?.map((s: any, i: number) => ({ ...s, title: s?.event?.title, color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0') })))
    }, [schedules])

    return (<Row sty>
        <Col md={9}>
            <Calendar events={events}></Calendar>
        </Col>
        <Col>
            <PedagogicalSchedule />
        </Col>
    </Row>)
}