import React, { useMemo, useState } from 'react'
import storage from '../../app/storage'
import { TabHistory } from '../pedagogical/Course/DetailCourse/tabs/TabHistory'

export const Activities = () => {
  const [me, setMe] = useState<any>()
  useMemo(() => {
    setMe(storage.get('user'))
  }, [])
  return <TabHistory modelName={'User,Person'} objectId={`${me?.id},${me?.personId}`} />

}
