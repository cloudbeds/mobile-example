export interface GuestProps {
  reservationID: string
  guestName: string
  guestID: number
  roomID: string
  roomName: string
  isMainGuest: boolean
  isAnonymized: boolean
  guestOptIn: boolean
  isMerged: boolean
  newGuestID: string
  isGuest: boolean
}

export interface GuestNotesProps {
  guestNoteID?: string | number
  userName?: string
  dateCreated?: any
  dateModified?: any
  guestNote?: string
}

export const getFilteredGuestsGroupBy = (guests: GuestProps[] = []) => {
  const data = guests.reduce((previous: any, guest) => {
    let filterTitle = guest?.isGuest ? 'Guests' : 'Reservations'

    previous[filterTitle || ''] = previous[filterTitle || ''] || []
    previous[filterTitle || ''].push(guest)
    return previous
  }, {})

  let finalData = Object.keys(data).map(e => {
    const value = {
      title: e,
      data: data[e],
    }
    return value
  })

  return finalData
}
