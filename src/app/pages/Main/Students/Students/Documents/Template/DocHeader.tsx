import React from 'react'
import { logo, CHEF_TITLE, CHEF_NAME } from './consts';

export const DocHeader = () => {
    return (
        <div><p style={{ textAlign: "center" }}>
            <img style={{ width: '50px', height: '50px', margin: "auto" }} src={logo} />
            &nbsp;</p>
            <p style={{ textAlign: "center" }}>REPUBLICA DE ANGOLA<br />MINISTERIO DO ENSINO SUPERIOR<br />INSITUTO SUPERIOR POLITECTNICO DO BENGO</p>
        </div>
    )
}
