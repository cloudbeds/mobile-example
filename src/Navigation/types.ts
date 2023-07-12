import { StackActionType } from '@react-navigation/native'

import {
  DashboardTypes,
  ReservationProps,
  ReservationsParams,
} from '../models/reservation'
import { GuestProps } from '../models/guest'

export interface ConfirmModalTypes {
  title: any
  description?: any
  confirmLabel?: any
  cancelLabel?: any
  disabled?: boolean
}

export interface RouteParamsInterface {
  title?: string
  emptyText?: string
  fetchParams?: ReservationsParams
  type?: DashboardTypes
  onClose?: any
  confirmParams?: ConfirmModalTypes
  reservation?: ReservationProps & GuestProps
  isGuest?: boolean
}

export type NavigateProps = {
  (name: string, params?: RouteParamsInterface): void
}

export type GenericNavigationProps = {
  navigate: NavigateProps
  setOptions: (options: Partial<unknown>) => void
  goBack: () => StackActionType
}

export type RouteProps = {
  key: string
  name: string
  params: RouteParamsInterface
}
