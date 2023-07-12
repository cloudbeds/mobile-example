import React from 'react'

import { modalConfig } from './config'
import Routes from './routesNames'

import ConfirmDialog from '../Components/ConfirmDialog'

const renderModals = (RootStack: any) => (
  <>
    <RootStack.Screen
      component={ConfirmDialog}
      name={Routes.ConfirmDialog}
      {...modalConfig}
    />
  </>
)

export default renderModals
