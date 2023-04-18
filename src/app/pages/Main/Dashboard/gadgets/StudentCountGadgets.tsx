import React from 'react'
import { Card, Col } from 'react-bootstrap'

export const StudentCountGadgets = ({data}:any) => {
    return (
        <Col md={6}>
            <Card className="card-dashboard-two">
                <Card.Header>
                    <h6>33.50% <i className="icon ion-md-trending-up tx-success"></i> <small>18.02%</small></h6>
                    <p>Bounce Rate</p>
                </Card.Header>
                <Card.Body>
                    <div className="chart-wrapper">
                        <div id="flotChart1" className="flot-chart"></div>
                    </div>
                    <span>{JSON.stringify(data, null, 1)}</span>
                </Card.Body>
            </Card>
        </Col>
    )
}
