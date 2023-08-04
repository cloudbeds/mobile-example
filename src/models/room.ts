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

export interface RoomTypesProps {
  roomTypeID?: string | number | null
  propertyID?: string
  roomTypeName?: string
  roomTypeNameShort?: string
  roomTypeDescription?: string
  isPrivate?: boolean
  maxGuests?: string | number
  adultsIncluded?: string | number
  childrenIncluded?: string | number
  roomTypePhotos?: string[]
  roomTypeFeatures?: string[]
  roomsAvailable?: string | number
  roomRate?: string | number
  roomTypeUnits?: string | number
}
