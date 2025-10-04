export interface ICard {
  id: string
  track: string
  number: string
  validToDate: string
}

export interface ICategory {
  id: string
  name: string
  isActive: boolean
  isDefaultForNewGuests: boolean
}

export interface IWalletBalance {
  id: string
  name: string
  type: number // enum?
  balance: number
}

export interface IGuest {
  id: string
  referrerId: string
  name: string
  surname: string
  middleName: string
  comment: string
  phone: string
  cultureName: string
  birthday: string // ISO datetime yyyy-MM-dd
  email: string
  sex: 1 | 2
  consentStatus: 0 | 1 | 2
  anonymized: boolean
  cards: ICard[]
  categories: ICategory[]
  walletBalances: IWalletBalance[]
  userData: string
  shouldReceivePromoActionsInfo: boolean
  shouldReceiveLoyaltyInfo: boolean
  shouldReceiveOrderStatusInfo: boolean
  personalDataConsentFrom: string
  personalDataConsentTo: string
  personalDataProcessingFrom: string
  personalDataProcessingTo: string
  isDeleted: boolean
  whenRegistered: string
  lastProcessedOrderDate: string
  firstOrderDate: string
  lastVisitedOrganizationId: string
  registrationOrganizationId: string
}
