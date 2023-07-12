export enum DashboardTypes {
  arrivals = 'arrivals',
  departures = 'departures',
  inHouse = 'inHouse',
}

export enum ReservationStatus {
  not_confirmed = 'not_confirmed',
  confirmed = 'confirmed',
  canceled = 'canceled',
  checked_in = 'checked_in',
  checked_out = 'checked_out',
  no_show = 'no_show',
}

export enum GuestGenderoptionalTypes {
  M = 'M',
  F = 'F',
  NA = 'N/A',
}

export enum RoomStatusTypes {
  in_house = 'in_house',
  checked_out = 'checked_out',
  not_checked_in = 'not_checked_in',
}

export interface ReservationsParams {
  propertyID?: number
  status?: ReservationStatus | string
  checkInFrom?: any
  checkInTo?: any
  checkOutFrom?: any
  checkOutTo?: any
  includeGuestsDetails?: boolean
}

export interface ReservationProps {
  propertyID: string
  reservationID: string
  dateCreated: any
  dateModified: any
  status: ReservationStatus | string
  guestID: number
  guestName: string
  startDate: any
  endDate: any
  adults: number
  children: number
  balance: number
  sourceName: string
  thirdPartyIdentifier: string
  guestList: { [key: string]: GuestProps }
  assigned?: RoomProps[]
  unassigned?: RoomProps[]
}

export interface GuestProps {
  guestName?: string
  guestFirstName?: string
  guestLastName?: string
  guestGender?: GuestGenderoptionalTypes
  guestEmail?: string
  guestPhone?: string
  guestCellPhone?: string
  guestAddress?: string
  guestAddress2?: string
  guestCity?: string
  guestState?: string
  guestCountry?: string
  guestZip?: string
  guestBirthdate?: string
  guestDocumentType?: string
  guestDocumentNumber?: string
  guestDocumentIssueDate?: string
  guestDocumentIssuingCountry?: string
  guestDocumentExpirationDate?: string
  taxID?: string
  companyTaxID?: string
  companyName?: string
  subReservationID?: string
  startDate?: any
  endDate?: any
  assignedRoom?: boolean
  isAnonymized?: boolean
  rooms?: RoomProps[]
  isMainGuest?: boolean
  unassignedRooms?: RoomProps[]
}

export interface RoomProps {
  roomID?: string
  roomName?: string
  roomTypeID?: string | number
  roomTypeName?: string
  roomStatus?: RoomStatusTypes
  subReservationID?: string
}

export interface ReservationNotesProps {
  reservationNoteID?: string
  userName?: string
  dateCreated?: string
  dateModified?: string
  reservationNote?: string
}

export const ReservationStatusName = (
  status: ReservationProps['status'] | RoomProps['roomStatus'],
) => {
  switch (status) {
    case ReservationStatus.checked_in:
      return 'Confirmation Pending'

    case ReservationStatus.confirmed:
      return 'Confirmed'

    case ReservationStatus.canceled:
      return 'Cancelled'

    case RoomStatusTypes.in_house:
      return 'In House'

    case ReservationStatus.checked_out:
      return 'Checked out'

    case ReservationStatus.no_show:
      return 'No Show'

    default:
      return status
  }
}

export const ReservationStatusColor = (
  status: ReservationProps['status'] | RoomProps['roomStatus'],
) => {
  switch (status) {
    case ReservationStatus.checked_in:
    case ReservationStatus.confirmed:
      return 'primary.500'

    case ReservationStatus.checked_out:
    case RoomStatusTypes.in_house:
      return 'success.500'

    case ReservationStatus.canceled:
      return 'error.400'

    case ReservationStatus.no_show:
      return 'info.600'

    default:
      return 'primary.600'
  }
}
