import { Post } from '../dashboard';

export interface LatestPostsModel {
  count: number,
  data: Post[]
}
