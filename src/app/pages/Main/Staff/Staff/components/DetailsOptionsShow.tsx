import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'

export const DetailsOptionsShow = () => {
    const [show, reshow] = useState(false)
    return (
        <>
            <a className="nav-link" href="#" onClick={()=>reshow(!show)}><i className="fa fa-ellipsis-h"></i></a>
            <Dropdown drop={'start'}>
                <Dropdown.Menu show={show} 
              >
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}
