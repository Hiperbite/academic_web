
import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

import locale from '@fullcalendar/core/locales/pt-br';
import { Col, Row } from 'react-bootstrap';

import './Calendar.scss'
export const Calendar = () => {
    const icons = {
        close: 'fa-times',
        prev: 'fa-chevron-left',
        next: 'fa-chevron-right',
        prevYear: 'fa-angle-double-left',
        nextYear: 'fa-angle-double-right'
    }
    const header = {
        start: 'title', // will normally be on the left. if RTL, will be on the right
        center: '',
        end: 'today prev,next' // will normally be on the right. if RTL, will be on the left
    }
    const events=[
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
    const customButtons={
        myCustomButton: {
            text: 'custom!',
            click: function () {
                alert('clicked the custom button!');
            }
        }
    }
    return (
        <Row id={'Calendar'}>
            <Col md={2}>
            </Col>
            <Col>
                <FullCalendar
                    events={events}
                    customButtons={customButtons}
                    headerToolbar={{
                        left: 'prev,next today myCustomButton',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    locale={locale}
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                />
            </Col>
        </Row>
    )
}