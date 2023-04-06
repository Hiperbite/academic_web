import React, { useState } from 'react'
import { Row } from 'react-bootstrap'
import { useApi } from '../../../../../app/api/apiSlice'
import { services } from '../../../../../app/api/services'

export const ClassColleges = ({ classe }: any) => {
    const colleges = [1, 2, 3]
    const [params, setParams] = useState({ 'where[classeId]': classe?.id , 'where[current]':true,scope:'students'})
    const { data:{data={data:[{}]}}, loading, error, resolve } = useApi({ service: services.student.enrollment.getAll, params })
    return (
        <Row id='ClassColleges'>
            <div className="col-lg-8">
                <div className="card card-dashboard-pageviews">
                    <div className="card-header">
                        <h6 className="card-title">Colegas da mesma turma</h6>
                    </div>{/* card-header */}
                    <div className="card-body">
                        {data?.map((enrollment: any) => <div className="az-list-item">
                            <div>
                                <i className='fa fa-user'></i>
                            </div>
                            <div>
                                <h6>{enrollment?.student?.person?.fullName}</h6>
                            </div>
                            <div>
                                <h6 className="tx-primary">{enrollment?.code}</h6>
                            </div>
                        </div>
                        )}

                    </div>{/* card-body */}
                </div>{/* card */}

            </div>{/* col */}
        </Row>)
}
