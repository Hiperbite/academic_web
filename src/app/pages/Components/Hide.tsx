import React from 'react'
import { Outlet } from 'react-router-dom'

export const Loading = ({ when }: { when: boolean }) => {
    return (<> {when ?
        <Outlet /> : null}
    </>
    )
}
