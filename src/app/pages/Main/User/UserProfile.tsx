import React, { useMemo, useState } from 'react'

import { Outlet } from 'react-router-dom'
import { Api } from '../../app/api/Api'
import { Menu } from '../../../layout/Page'
import { UserProfileHeader } from './components/UserProfileHeader'

export const UserProfile = () => {
  const [me, setMe] = useState<any>()
  const [refresh, setRefresh] = useState<any>()
  useMemo(async () => {
    const { response: { data: response } } = await Api.get({ service: '/users/me' })
    setMe(response)
  }, [refresh])
  return (<>
    <UserProfileHeader me={me} setRefresh={setRefresh} />
    <div className="az-content pd-y-20 pd-lg-y-30 pd-xl-y-40">
      <div className="container">
        <div className="az-content-left az-content-left-components">
          <Menu menu={"me"} />
        </div>
        <div className="az-content-body pd-lg-l-40 d-flex flex-column">
          <Outlet context={[me,setRefresh]} />
        </div>
      </div>
    </div>
  </>
  )
}
