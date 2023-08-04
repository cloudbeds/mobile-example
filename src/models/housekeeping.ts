import _ from 'lodash'

export enum RoomConditions {
  dirty = 'dirty',
  clean = 'clean',
}

export enum FrontdeskStatus {
  CheckIn = 'check-in',
  CheckOut = 'check-out',
  Stayover = 'stayover',
  Turnover = 'turnover',
  Unused = 'unused',
}

export enum FilterTypes {
  Type = 'type',
  Status = 'status',
  Condition = 'condition',
  Assigned = 'assigned',
  Frontdesk = 'frontdesk',
}

export interface HousekeepingStatusProps {
  date?: any
  roomTypeID?: number
  roomTypeName?: string
  roomID?: string
  roomName?: string
  roomCondition?: RoomConditions
  roomOccupied?: boolean
  roomBlocked?: boolean
  frontdeskStatus?: FrontdeskStatus
  housekeeperID?: string | null
  housekeeper?: string | 'N/A'
  doNotDisturb?: boolean
  roomComments?: string
}

export interface HousekeepersProps {
  propertyID?: number
  housekeeperID?: number
  name?: string
}

export interface OptionsProps {
  label: string
  value: any
}

export const emptyOptions: OptionsProps[] = [{ label: 'All', value: 'all' }]
export const nullOptions: OptionsProps[] = [{ label: 'N/A', value: null }]

export const roomStatus: OptionsProps[] = [
  { label: 'All', value: 'all' },
  { label: 'Occupied', value: true },
  { label: 'Vacant', value: false },
]

export const getConditionLabel = (condition: RoomConditions) => {
  switch (condition) {
    case RoomConditions.clean:
      return 'Clean'

    case RoomConditions.dirty:
      return 'Dirty'

    default:
      return condition
  }
}

export const roomConditions: OptionsProps[] = [
  { label: 'All', value: 'all' },
  {
    label: getConditionLabel(RoomConditions.clean),
    value: RoomConditions.clean,
  },
  {
    label: getConditionLabel(RoomConditions.dirty),
    value: RoomConditions.dirty,
  },
]

export const getFrontdeskLabel = (status: FrontdeskStatus) => {
  switch (status) {
    case FrontdeskStatus.CheckIn:
      return 'Check-in'

    case FrontdeskStatus.CheckOut:
      return 'Check-out'

    case FrontdeskStatus.Stayover:
      return 'Stayover'

    case FrontdeskStatus.Turnover:
      return 'Turnover'

    case FrontdeskStatus.Unused:
      return 'Not Reserved'

    default:
      return status
  }
}

export const frontdeskStatus: OptionsProps[] = [
  { label: 'All', value: 'all' },
  {
    label: getFrontdeskLabel(FrontdeskStatus.CheckIn),
    value: FrontdeskStatus.CheckIn,
  },
  {
    label: getFrontdeskLabel(FrontdeskStatus.CheckOut),
    value: FrontdeskStatus.CheckOut,
  },
  {
    label: getFrontdeskLabel(FrontdeskStatus.Stayover),
    value: FrontdeskStatus.Stayover,
  },
  {
    label: getFrontdeskLabel(FrontdeskStatus.Turnover),
    value: FrontdeskStatus.Turnover,
  },
  {
    label: getFrontdeskLabel(FrontdeskStatus.Unused),
    value: FrontdeskStatus.Unused,
  },
]

export const sheetTitle = (sFilters: FilterTypes) => {
  switch (sFilters) {
    case FilterTypes.Type:
      return 'Type'

    case FilterTypes.Status:
      return 'Status'

    case FilterTypes.Condition:
      return 'Condition'

    case FilterTypes.Assigned:
      return 'Assigned To'

    case FilterTypes.Frontdesk:
      return 'Frontdesk Status'

    default:
      return ''
  }
}

export const sheetList = (
  type: FilterTypes,
  roomTypes: OptionsProps[],
  housekeepers: OptionsProps[],
) => {
  switch (type) {
    case FilterTypes.Type:
      if (roomTypes?.length) {
        return [...emptyOptions, ...roomTypes]
      }

      return emptyOptions

    case FilterTypes.Status:
      return roomStatus

    case FilterTypes.Condition:
      return roomConditions

    case FilterTypes.Assigned:
      if (housekeepers?.length) {
        return [...emptyOptions, ...nullOptions, ...housekeepers]
      }

      return [...emptyOptions, ...nullOptions]

    case FilterTypes.Frontdesk:
      return frontdeskStatus

    default:
      return emptyOptions
  }
}

export const filterHousekeepersByID = (
  housekeepers: HousekeepersProps[] = [],
) => {
  return _.uniqBy(housekeepers, 'housekeeperID')
}
