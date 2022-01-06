import { ImageModel, PostDetailModel } from '../latest-posts';

export interface ReportsModel {
  count: number;
  data: ReportDetailsModel[];
}

interface ReportDetailsModel {
  createdAt?: string;
  post?: PostDetailModel;
  postOwner?: Person;
  reporter?: Person;
  status?: string;
  text?: string;
  updatedAt?: string;
  __v?: number;
  _id?: number;
  comment?: {
    createdAt: string;
    image: ImageModel;
    likes: [];
    owner: string;
    postId: string;
    subComments?: SubComments[];
    tagPersons?: [
      {
        endIndex: number;
        startIndex: number;
        _id: string;
      }
    ];
    text: string;
    __v: number;
    _id: string;
  };
  commentOwner?: Person;
  post?: PostDetailModel;
  subComment?: string;
  subSubComment?: string;
}

interface Person {
  firstName: string;
  lastName: string;
  username: string;
  _id: string;
  profileImage: {
    height: number;
    imgURL: string;
    width: number;
  };
}

interface SubComments {
  createdAt?: string;
  image?: ImageModel;
  likes?: [];
  owner?: string;
  subSubComments?: SubComments[];
  tagPersons?: [
    {
      endIndex: number;
      startIndex: number;
      _id: string;
    }
  ];
  text: string;
  __v: number;
  _id: string;
}
