import React from 'react'
import { useDate } from './useDate'

export const Greatings = () => {

    const { date, time, wish } = useDate()
    return (
        <div>
            <h2 className="az-dashboard-title">Hi, welcome back!</h2>
            <p className="az-dashboard-text">
                {wish} it is {date}
            </p>
        </div>
    )
}
