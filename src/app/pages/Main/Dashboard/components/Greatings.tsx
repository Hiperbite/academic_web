import React from 'react'
import storage from '../../../../app/storage';
import { useDate } from './useDate'

export const Greatings = () => {
    const user = storage.get('user');
    const { date, time, wish } = useDate()
    return (
        <div>
            <h2 className="az-dashboard-title">Ola, seja benvindo {user?.person?.firstName} {user?.person?.lastName}!</h2>
            <p className="az-dashboard-text">
                {wish} hoje é {date}
            </p>
        </div>
    )
}
