export interface VenueStateModel {
  _id?: string,
  allowUsersToAccessAfterLeaving: boolean,
  accessDaysAfter: number,
  inObjectRadiusInMeters: number,
  allTimeVisitorsCount: number,
  logo: VenueImageModel,
  cover: VenueImageModel,
  coverThumbnail: VenueImageModel,
  location: {
    address: string,
    city: string,
    code: string,
    country: string,
    point: {
      type: string,
      coordinates: Array<number>
    },
    state: string,
    street: string,
  },
  profile: {
    description: string,
    name: string,
    rating: number
    phoneNumber: string,
    webSite: string,
  },
  type: string
}

export interface VenueImageModel {
  height: number,
  width: number
  imgURL: string
}

export interface VenueSendModel {
  data: VenueStateModel
  logo: File,
  cover: File,
  coverThumbnail: File
}

export type VenueImages = 'logo' | 'cover' | 'coverThumbnail';
