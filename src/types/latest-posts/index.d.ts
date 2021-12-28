import { PostModel } from '../dashboard';
import { number, string } from 'prop-types';

export interface LatestPostsModel {
  count: number,
  data: PostModel[]
}

export interface PostDetailModel {
  comments: PostDetailCommentModel[],
  commentsCount?: number,
  contentType?: string,
  createdAt?: string,
  image?: ImageModel,
  likesCount?: number,
  owner?: string,
  placeId?: string,
  tagPersons?: []
  text?: string,
  type?: string,
  viewsCount?: number,
  url?: string,
  __v?: number,
  _id?: string
}

interface PostDetailCommentModel {
  createdAt: string,
  likes: []
  owner: {
    birthday: string,
    firstName: string,
    gender: string,
    lastName: string,
    profileImage: ImageModel
    username: string,
    _id: string,
  }
  postId: string,
  subComments: PostDetailCommentModel[]
  tagPersons: []
  text: string,
  __v: number,
  _id: string,
}

interface ImageModel {
  height: number
  imgURL: string,
  width: number
}
