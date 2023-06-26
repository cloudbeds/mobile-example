import { StackActionType } from '@react-navigation/native'

export interface RouteParamsInterface {}

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
