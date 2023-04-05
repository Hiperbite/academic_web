import React, { useState } from 'react'
import { Container, Tab, Tabs } from 'react-bootstrap'
import { GeneralSettings } from './GeneralSettings';
import { ProfileSettings } from './ProfileSettings';
import './Settings.scss'
export const Settings = () => {

  const [key, setKey] = useState<string>('home');
  return (<div id='Settings'>
    <Tabs
      id="controlled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="perfil" title="Perfil">
        <ProfileSettings />
      </Tab>
      <Tab eventKey="home" title="Inicio">
        <GeneralSettings />
      </Tab>
      <Tab eventKey="general" title="Geral">
        <GeneralSettings />
      </Tab>
      <Tab eventKey="contact" title="Contact">
        <GeneralSettings />
      </Tab>
      <Tab eventKey="privacidade" title="Privacidade">
        <GeneralSettings />
      </Tab>
    </Tabs></div>
  )
}
