export interface InitialDataModel {
  adminRole: RoleModel,
  places: Array<PlaceModel>,
  roles: Array<RoleModel>
}

interface RoleModel {
  description: string,
  name: string,
  __v: number,
  _id: string,
}

export interface PlaceModel {
  _id: string,
  logo: {
    height: number,
    imgURL: string,
    width: number,
  },
  profile: {
    description: string,
    name: string,
    rating: number,
  }
}
