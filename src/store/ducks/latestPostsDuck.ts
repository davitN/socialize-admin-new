import { AnyAction } from 'redux';
import { CallBacks } from '../../types/main';
import { TableQueryParams } from '../../types/table';
import { LatestPostsModel } from '../../types/latest-posts';

export const GET_LATEST_POSTS_SG = "socialize/main/getLatestPosts_sg";
export const SET_LATEST_POSTS = "socialize/main/setLatestPosts";
export const GET_LATEST_POST_SG = "socialize/main/getLatestPost_sg"
export const DELETE_LATEST_POST_SG = "socialize/main/deleteLatestPost_sg"

const initialState: { latestPosts: LatestPostsModel } = {
  latestPosts: {
    count: null,
    data: []
  }
};

export const latestPostsReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_LATEST_POSTS:
      return {
        ...state,
        latestPosts: (payload as LatestPostsModel),
      };
    default:
      return state;
  }
};

export const getSelectedPostActionSG = (
    postId: string,
    callbacks?: CallBacks
) => ({
  type: GET_LATEST_POST_SG,
  postId,
  callbacks,
});

export const deleteSelectedPostActionSG = (
    postId: string,
    callbacks?: CallBacks
) => ({
  type: DELETE_LATEST_POST_SG,
  postId,
  callbacks,
});

export const setLatestPostsAction = (latestPosts: LatestPostsModel) => ({
  type: SET_LATEST_POSTS,
  payload: latestPosts,
});

export const getLatestPostsActionSG = (params: TableQueryParams, callbacks?: CallBacks) => ({
  params,
  type: GET_LATEST_POSTS_SG,
  callbacks,
});
