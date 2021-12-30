/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { Card, CardBody, Form } from 'reactstrap';

import { createUseStyles } from 'react-jss';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import TextInput from '../components/shared/form-elements/TextInput';
import { Tree } from 'primereact/tree';
import {
  deleteSelectedPostActionSG,
  getSelectedPostActionSG,
} from '../store/ducks/latestPostsDuck';
import { PostDetailCommentModel, PostDetailModel } from '../types/latest-posts';
import altImg from '../assets/images/alt-profile-img.jpg';

const useStyles = createUseStyles({
  inputError: {
    '& input': {
      borderColor: '#ff4a4a',
    },
  },
  buttonStyles: {
    backgroundColor: '#991a1a',
    borderColor: '#991a1a',
    '&:hover': {
      backgroundColor: '#d51c1c!important',
      borderColor: '#d51c1c!important',
    },
  },
  inputBlock: {
    '& label': {
      width: '200px',
      marginBottom: 0,
      textAlign: 'start',
    },
    '& input': {
      width: 'calc(100% - 200px)',
      borderRadius: '0.25rem',
    },
  },
  multiSelectClass: {
    height: '40px',
    '& label': {
      width: '200px',
      textAlign: 'start',
    },
    '& .p-multiselect': {
      width: 'calc(100% - 200px)',
      borderRadius: '0.25rem',
      height: '100%',
    },
  },
  formLabel: {
    width: '200px',
  },
  formValue: {
    width: 'calc(100% - 200px)',
  },
  treeBox: {
    width: '100%',
    textAlign: 'start',
  },
  image: {
    maxWidth: '100px',
  },
});

const LatestPostForm: React.FC<{}> = () => {
  const classes = useStyles();
  const [newMode, setNewMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: postId } = useParams();
  const [values, setValues] = useState<PostDetailModel>({
    comments: [
      {
        _id: '',
        createdAt: '',
        likes: null,
        owner: {
          birthday: '',
          firstName: '',
          gender: '',
          lastName: '',
          profileImage: {
            height: null,
            width: null,
            imgURL: '',
          },
          username: '',
          _id: '',
        },
        postId: '',
        tagPersons: [],
        text: '',
        __v: null,
        subComments: [],
      },
    ],
  });

  const nodeTemplate = (node: {
    label: string;
    data: PostDetailCommentModel;
  }) => {
    switch (node.label) {
      case 'LEVEL_1':
        return (
          <div className={classes.treeBox}>
            <img
              src={node.data?.image?.imgURL || ''}
              className={classes.image}
              alt=""
            />{' '}
            {node.data.text}
          </div>
        );
      default:
        return <div className={classes.treeBox}>{node.label}</div>;
    }
  };

  const setNodes = () => {
    return values.comments.map((comment) => ({
      key: comment._id,
      label: 'LEVEL_1',
      data: comment,
      children: [
        {
          key: `${comment._id}-${comment.owner.username}`,
          label: `Owner: ${comment.owner.username}`,
        },
        comment.tagPersons.length > 0 && {
          key: `${comment._id}-${comment.tagPersons.length}`,
          label: `Tags: ${comment.tagPersons.map(
            (tagPerson: any) => `${' '} ${tagPerson.username}`
          )}`,
        },
        ...(comment.subComments &&
          comment.subComments.map((subComment) => ({
            key: `${comment._id}-${subComment._id}`,
            label: subComment.text,
            children: [
              {
                key: `${subComment._id}-${subComment.owner.username}`,
                label: `Owner: ${subComment.owner.username}`,
              },
              subComment.tagPersons.length > 0 && {
                key: `${subComment._id}-${subComment.tagPersons.length}`,
                label: `Tags: ${subComment.tagPersons.map(
                  (tagPerson: any) => `${' '} ${tagPerson.username}`
                )}`,
              },
              ...(subComment.subSubComments &&
                subComment.subSubComments.map((subSubComment) => ({
                  key: `${subComment._id}-${subSubComment._id}`,
                  label: subSubComment.text,
                  children: [
                    {
                      key: `${subSubComment._id}-${subSubComment.owner.username}`,
                      label: `Owner: ${subSubComment.owner.username}`,
                    },
                    subSubComment.tagPersons.length > 0 && {
                      key: `${subSubComment._id}-${subSubComment.tagPersons.length}`,
                      label: `Tags: ${comment.tagPersons.map(
                        (tagPerson: any) => `${' '} ${tagPerson.username}`
                      )}`,
                    },
                  ],
                }))),
            ],
          }))),
      ],
    }));
  };

  const [treeData, setTreeData] = useState<any>(setNodes());

  useEffect(() => {
    if (values.comments.length > 0) {
      setTreeData(setNodes());
    }
  }, [values]);

  const getSelectedPost = (id: string) => {
    dispatch(
      getSelectedPostActionSG(id, {
        success: (res: PostDetailModel) => {
          setValues({ ...values, ...res });
        },
        error: () => {
          navigate(-1);
        },
      })
    );
  };

  useEffect(() => {
    if (postId === 'new') {
      setNewMode(true);
    } else if (postId) {
      setNewMode(false);
      getSelectedPost(postId);
    }
  }, [postId]);

  const deletePost = (event: Event) => {
    event.preventDefault();
    dispatch(
      deleteSelectedPostActionSG(postId, {
        success: () => {
          navigate(-1);
        },
        error: () => {
          navigate(-1);
        },
      })
    );
  };

  return (
    <div className="page-content">
      <Card>
        <CardBody>
          <Form>
            {values.image?.imgURL && (
              <div className={`flex-horizontal mb-3 ${classes.inputBlock}`}>
                <label>Image</label>
                <img
                  data-dz-thumbnail=""
                  height={values.image.height / 3}
                  width={values.image.width / 3}
                  className={'rounded'}
                  src={values.image.imgURL || altImg}
                />
              </div>
            )}
            <TextInput
              customClasses={`flex-horizontal mb-3 ${classes.inputBlock}`}
              value={values._id}
              label="Post Id"
              readonly={true}
            />
            <TextInput
              customClasses={`flex-horizontal mb-3 ${classes.inputBlock}`}
              value={values.text}
              label="Text"
              readonly={true}
            />
            <TextInput
              customClasses={`flex-horizontal mb-3 ${classes.inputBlock}`}
              value={values.likesCount}
              label="Likes count"
              readonly={true}
            />
            <TextInput
              customClasses={`flex-horizontal mb-3 ${classes.inputBlock}`}
              value={values.commentsCount}
              label="Comments count"
              readonly={true}
            />
            <TextInput
              customClasses={`flex-horizontal mb-3 ${classes.inputBlock}`}
              value={new Date(values.createdAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
              label="Date"
              readonly={true}
            />
            <Button
              className={classes.buttonStyles}
              label={'Delete Post'}
              onClick={() => deletePost(event)}
              type={'button'}
            />
          </Form>
        </CardBody>
      </Card>
      {values.comments.length > 0 && (
        <Card>
          <CardBody>
            <Tree value={treeData} nodeTemplate={nodeTemplate} />
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default LatestPostForm;
