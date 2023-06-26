export interface TokenDataProps {
  accessToken: string
  accessTokenExpirationDate: string
  authorizeAdditionalParameters: any
  idToken: string
  refreshToken: string
  scopes: any[]
  tokenAdditionalParameters: any
  tokenType: string
}

export interface UsersProps {
  [key: PropertyProps['propertyID']]: UsersItemProps[]
}

export interface UsersItemProps {
  userID: number
  firstName: string
  lastName: string
  email: string
  userRole: {
    name: string
    description: string | null
  }
  active: string
  lastLogin: string
  propertyId: number
}

export interface UserInfoParams {
  property_id?: number
  role_details?: boolean
}

export interface UserInfoProps {
  user_id: number
  first_name: string
  last_name: string
  email: string
  acl: any[]
  roles: RolesProps[]
}

export interface RolesProps {
  id: number
  name: string
  description: string
}

export interface PropertyProps {
  propertyID: string
  propertyName: string
  propertyImage: string
  propertyDescription: string
  propertyTimezone: string
  propertyCurrency: {
    currencyCode: string
    currencySymbol: string
    currencyPosition: string
  }
}
