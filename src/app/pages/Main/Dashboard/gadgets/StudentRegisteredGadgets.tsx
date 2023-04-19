import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


import React, { useMemo, useState } from 'react'
import { Card, Col } from 'react-bootstrap'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};
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
            label: 'Inscritos',
            data: [],
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

export const StudentRegisteredGadgets = ({ data }: any) => {
    const [charData, setcharData] = useState<any>({});
    const [great, setGreat] = useState<any>({});
    useMemo(() => {
        chartMainData.labels = data?.map(({ name }: any) => name)
        chartMainData.datasets[0].data = data?.map(({ count }: any) => count)
        setcharData(chartMainData)
        setGreat(data?.sort((x: any, y: any) => x.count > y.count ? -1 : 1)[0])
    }, [data])
    return (
        <Card className="card-dashboard-one">
            <Card.Header>
                <div>
                    <h3 className="card-title">Numero de estudantes Inscritos por Curso</h3>
                    <p className="card-text">Audience to which the users belonged while on the current date range.</p>
                </div>
                <div className="btn-group">
                    <button className="btn active">Hoje</button>
                    <button className="btn">Ontem</button>
                    <button className="btn">Este Mês</button>
                </div>
            </Card.Header>
            <Card.Body>
                {data ? <Bar options={options} data={charData} /> : null}

            </Card.Body>
        </Card>

    )
}
