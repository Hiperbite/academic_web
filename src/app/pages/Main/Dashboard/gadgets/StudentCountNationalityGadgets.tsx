import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import React, { useMemo, useState } from 'react'
import { Card, Col } from 'react-bootstrap'

ChartJS.register(ArcElement, Tooltip, Legend);

const labels: any = {
    greatThan25: '>25',
    lessThan18: '<18',
    between21And25: '21 á 25',
    between18And20: '18 á 20'
}
const chartMainData = {
    labels: {},
    datasets: [
        {
            label: 'Quantidade',
            data: {},
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
        },
    ],
};
export const StudentCountNationalityGadgets = ({ data }: any) => {
    const [charData, setcharData] = useState<any>({});
    const [great, setGreat] = useState<any>({});
    useMemo(() => {
        chartMainData.labels = data?.map(({ nationality }: any) => nationality )
        chartMainData.datasets[0].data = data?.map(({ count }: any) => count)
        setcharData(chartMainData)
        setGreat(data?.sort((x: any, y: any) => x.count > y.count ? -1 : 1)[0])
    }, [data])
    return (
        <Col md={6}>
            <Card className="card-dashboard-two">
                <Card.Header>
                    <h6>{great?.count} <i className="icon ion-md-trending-up tx-success"></i> <small>18.02%</small></h6>
                    <p>Nacionalidade</p>
                </Card.Header>
                <Card.Body>
                    <Pie data={charData} />
                </Card.Body>
            </Card>
        </Col>
    )
}
