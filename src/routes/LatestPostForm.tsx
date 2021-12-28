/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, useEffect, useState } from 'react';

import { Card, CardBody, Form } from 'reactstrap';

import { createUseStyles } from 'react-jss';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import TextInput from '../components/shared/form-elements/TextInput';
import { deleteSelectedPostActionSG, getSelectedPostActionSG } from '../store/ducks/latestPostsDuck';
import { PostDetailModel } from '../types/latest-posts';
import altImg from '../assets/images/alt-profile-img.jpg';

const useStyles = createUseStyles({
  inputError: {
    '& input': {
      borderColor: '#ff4a4a'
    }
  },
  buttonStyles: {
    backgroundColor: '#991a1a',
    borderColor: '#991a1a',
    '&:hover': {
      backgroundColor: '#d51c1c!important',
      borderColor: '#d51c1c!important',
    }
  },
  inputBlock: {
    '& label': {
      width: '200px',
      marginBottom: 0,
      textAlign: 'start'
    },
    '& input': {
      width: 'calc(100% - 200px)',
      borderRadius: '0.25rem',
    }
  },
  multiSelectClass: {
    height: '40px',
    '& label': {
      width: '200px',
      textAlign: 'start'
    },
    '& .p-multiselect': {
      width: 'calc(100% - 200px)',
      borderRadius: '0.25rem',
      height: '100%'
    }
  },
  formLabel: {
    width: '200px',
  },
  formValue: {
    width: 'calc(100% - 200px)'
  }
})

const LatestPostForm: React.FC<{}> = () => {
  const classes = useStyles();
  const [newMode, setNewMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: postId } = useParams();
  // const { companySubscriptionData } = useSelector((state: RootState) => state.companyReducer);
  const [values, setValues] = useState<PostDetailModel>({
    comments: []
  })

  const getSelectedPost = (id: string) => {
    dispatch(getSelectedPostActionSG(id, {
      success: (res: PostDetailModel) => {
        setValues({ ...values, ...res });
      },
      error: () => {
        navigate(-1);
      }
    }))
  }

  useEffect(() => {
    if (postId === 'new') {
      setNewMode(true)
    } else if (postId) {
      setNewMode(false);
      getSelectedPost(postId);
    }
  }, [postId]);

  const deletePost = (event: Event) => {
    event.preventDefault();
    dispatch(deleteSelectedPostActionSG(postId, {
      success: () => {
        navigate(-1);
      },
      error: () => {
        navigate(-1);
      }
    }))
  }

  return (
      <div className="page-content">
        <Card>
          <CardBody>
            {/*<CardTitle className={'text-start'}>Location Information</CardTitle>*/}
            {/*<CardSubtitle className="mb-4 text-start">*/}
            {/*  Make sure your location information is accurate.*/}
            {/*</CardSubtitle>*/}
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
                    year: 'numeric'
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
      </div>
  );
};

export default LatestPostForm;
