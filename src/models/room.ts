export interface RoomProps {
  roomID?: string | null
  roomName?: string
  roomDescription?: string
  maxGuests?: number
  isPrivate?: boolean
  roomBlocked?: boolean
  roomTypeID?: string | number | null
  roomTypeName?: string
  roomTypeNameShort?: string
}

export interface RoomsDataProps {
  propertyID: number
  rooms: RoomProps[]
}
