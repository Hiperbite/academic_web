import React, { useState } from 'react'
import { Card } from 'react-bootstrap';
import { useApi } from '../../../../app/api/apiSlice';
import { services } from '../../../../app/api/services';

export const ClassCountGadgets = () => {

    const [params, setParams] = useState({ pageSize: 8, page: 1 });


    const { data: { data: classes } = {} } = useApi({ service: services.academic.class.getAll, params })

    const updateParams = (opts: any) => {
        setParams({ ...params, ...opts });
    }
    const persent = (classe: any) => Number((((classe?.activeEnrollments?.length ?? 1) / (classe?.classeRoom?.size ?? 1)) * 100).toFixed(2));;

    return (
        <Card className="card-dashboard-pageviews">
            <Card.Header>
                <h3 className="card-title">Turmas</h3>
                
            </Card.Header>
            <Card.Body>
                {classes?.map((classe: any) =>
                    <div className="az-list-item">
                        <div>
                            <h6>{classe?.code}</h6>
                            <span>Ano: {classe?.grade} - Periodo: {classe?.period?.descriptions} - Curso: {classe?.course?.name}</span>
                        </div>
                        <div>
                            <h6 className="tx-primary">{classe?.activeEnrollments?.length}/{classe?.classeRoom?.size}</h6>
                            <span>{persent(classe)}% </span>
                        </div>
                    </div>
                )}
            
            </Card.Body>
        </Card>
    )
}
