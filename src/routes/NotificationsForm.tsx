/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'primereact/button';
import { createUseStyles } from 'react-jss';
import { Card, CardBody, CardTitle } from 'reactstrap';
import TextInput from '../components/shared/form-elements/TextInput';
import {
  NotificationsSendModel,
  NotificationsStateModel,
} from '../types/notifications';
import {
  postDraftOrScheduledActionSG,
  postNotificaiotnsAciotnSG,
} from '../store/ducks/notificationsDuck';
import { useNavigate } from 'react-router';
import Dropzone from 'react-dropzone';
import readImgAsync from '../helpers/utils/readImgAsync';
import { RootState } from '../store/configureStore';
import { Calendar } from 'primereact/calendar';

const useStyles = createUseStyles({
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
    '& .p-dropdown, & .p-multiselect': {
      width: 'calc(100% - 200px)',
      borderRadius: '0.25rem',
      height: '100%',
    },
  },
  inputError: {
    '& input': {
      borderColor: '#ff4a4a',
    },
  },
  formLabel: {
    width: '200px',
  },
  formValue: {
    width: 'calc(100% - 200px)',
  },
  dropZonePreviewImg: {
    width: '140px',
    height: 'calc(140px - 1rem)',
    objectFit: 'cover',
  },
  submitButton: {
    marginLeft: '20px',
  },
});

const NotificationsForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [scheduled, setScheduled] = useState<boolean>(false);
  const { selectedPlaceId } = useSelector(
    (state: RootState) => state.initialDataReducer
  );
  const [logoImg, setLogoImg] = useState([]);
  const [validation, setValidation] = useState<{
    notificationText: boolean;
    notificationTitle: boolean;
    postText: boolean;
    daysSinceVisited: boolean;
    submitted: boolean;
    dateToSend?: boolean;
  }>({
    notificationText: false,
    notificationTitle: false,
    postText: false,
    daysSinceVisited: false,
    submitted: false,
    dateToSend: false,
  });
  const [values, setValues] = useState<NotificationsStateModel>({
    notificationText: '',
    notificationTitle: '',
    postText: '',
    postContentType: 'STANDARD',
    width: null,
    height: null,
    img: {
      width: null,
      height: null,
      imgURL: '',
    },
    daysSinceVisited: null,
    placeId: '',
    dateToSend: '',
  });

  useEffect(() => {
    setValues({ ...values, placeId: selectedPlaceId });
  }, [selectedPlaceId]);

  const handleDate = (e: any) => {
    const year = e.getFullYear();
    const month = (e.getMonth() + 1).toString().padStart(2, '0');
    const day = e.getDate();
    const hour = e.getHours().toString().padStart(2, '0');
    const minutes = e.getMinutes().toString().padStart(2, '0');
    const seconds = e.getSeconds().toString().padStart(2, '0');
    const milliseconds = e.getMilliseconds();

    const dateToSend = `${year}-${month}-${day}T${hour}:${minutes}:${seconds}.${milliseconds}Z`;
    setValues({ ...values, dateToSend: dateToSend });
  };

  const handleValidation = () => {
    {
      !scheduled
        ? setValidation({
            ...validation,
            notificationText: !!values.notificationTitle,
            notificationTitle: !!values.notificationTitle,
            postText: !!values.postText,
            daysSinceVisited: !!values.daysSinceVisited,
            dateToSend: true,
          })
        : setValidation({
            ...validation,
            notificationText: !!values.notificationTitle,
            notificationTitle: !!values.notificationTitle,
            postText: !!values.postText,
            daysSinceVisited: !!values.daysSinceVisited,
            dateToSend: !!values.dateToSend,
          });
    }
  };

  const sendData: NotificationsSendModel = {
    data: null,
    image: null,
  };

  useEffect(() => {
    handleValidation();
  }, [values, scheduled]);

  const submitFormHandler = (buttonType: 'DRAFT' | 'SCHEDULED' | 'SENDNOW') => {
    setValidation({ ...validation, submitted: true });
    if (
      !(
        validation.notificationText &&
        validation.notificationTitle &&
        validation.postText &&
        validation.daysSinceVisited &&
        validation.dateToSend
      )
    ) {
      return;
    }
    sendData.data = {
      placeId: values.placeId,
      daysSinceVisited: +values.daysSinceVisited,
      width: +values.width,
      postContentType: 'STANDARD',
      notificationText: values.notificationText,
      notificationTitle: values.notificationTitle,
      postText: values.postText,
      height: +values.height,
      dateToSend: values.dateToSend,
    };
    sendData.image = logoImg[0];
    switch (buttonType) {
      case 'DRAFT':
      case 'SCHEDULED':
        sendData.data.type = buttonType;
        dispatch(
          postDraftOrScheduledActionSG(sendData, {
            success: () => {
              navigate(-1);
            },
            error: () => {
              //
            },
          })
        );
        break;
      case 'SENDNOW':
        dispatch(
          postNotificaiotnsAciotnSG(sendData, {
            success: () => {
              navigate(-1);
            },
            error: () => {
              //
            },
          })
        );
        break;
    }
  };

  function formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  function handleAcceptedFiles(files: any) {
    files.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setLogoImg(files);
    setImgDimensions(files[0]);
  }

  const setImgDimensions = async (e: any) => {
    const { imgDimension } = await readImgAsync(e);
    setValues({
      ...values,
      width: imgDimension.width,
      height: imgDimension.height,
    });
    console.log(imgDimension);
  };

  return (
    <div className="page-content">
      <Card>
        <CardBody>
          <div className={'mb-3'}>
            <CardTitle className={'flex-horizontal justify-content-start'}>
              Create Notification
            </CardTitle>
            <span className={'flex-horizontal justify-content-start'}>
              Create a notification to send to your customers
            </span>
          </div>
          <TextInput
            label={'Notification Title'}
            value={values.notificationTitle}
            customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${
              validation.submitted && !validation.notificationTitle
                ? classes.inputError
                : ''
            }`}
            handleChange={(event) =>
              setValues({ ...values, notificationTitle: event })
            }
            required
          />
          <TextInput
            label={'Notification Message'}
            value={values.notificationText}
            customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${
              validation.submitted && !validation.notificationText
                ? classes.inputError
                : ''
            }`}
            handleChange={(event) =>
              setValues({ ...values, notificationText: event })
            }
            required
          />
          <TextInput
            label={'Post Text'}
            value={values.postText}
            customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${
              validation.submitted && !validation.postText
                ? classes.inputError
                : ''
            }`}
            handleChange={(event) => setValues({ ...values, postText: event })}
            required
          />
          <div className={'flex-horizontal mb-3'}>
            <label className={`flex-horizontal ${classes.formLabel}`}>
              Post Image
            </label>
            <div className={`flex-horizontal ${classes.formValue}`}>
              <Dropzone
                onDrop={(acceptedFiles) => {
                  handleAcceptedFiles(acceptedFiles);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className={`dropzone`}>
                    <div className="dz-message needsclick" {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="dz-message needsclick">
                        <div className="mb-3">
                          <i className="display-4 text-muted bx bxs-cloud-upload" />
                        </div>
                        <h5>Drop Image here or click to upload.</h5>
                      </div>
                    </div>
                  </div>
                )}
              </Dropzone>
              <div className="dropzone-previews ms-3" id="file-previews">
                {logoImg.length === 0 && values.img.imgURL && (
                  <Card className="mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
                    <div className="p-2">
                      <div className="align-items-center">
                        <div>
                          <img
                            data-dz-thumbnail=""
                            height="80"
                            className={`avatar-sm rounded bg-light ${classes.dropZonePreviewImg}`}
                            alt={'logo'}
                            src={values.img.imgURL}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
                {logoImg.map((f: any, i) => {
                  return (
                    <Card
                      className="mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                      key={i + '-file'}
                    >
                      <div className="p-2">
                        <div className="align-items-center">
                          <div className="col-auto">
                            <img
                              data-dz-thumbnail=""
                              height="80"
                              className={`avatar-sm rounded bg-light ${classes.dropZonePreviewImg}`}
                              alt={f.name}
                              src={f.preview}
                            />
                          </div>
                          <div>
                            <div className="text-muted font-weight-bold">
                              {f.name}
                            </div>
                            <p className="mb-0">
                              <strong>{f.formattedSize}</strong>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
          <TextInput
            label={'Days Since Visited'}
            value={values.daysSinceVisited}
            customClasses={`flex-horizontal mb-3 ${classes.inputBlock} ${
              validation.submitted && !validation.daysSinceVisited
                ? classes.inputError
                : ''
            }`}
            handleChange={(event) =>
              setValues({ ...values, daysSinceVisited: +event })
            }
            required
          />
          <div
            className={`flex-horizontal mb-3 ${
              validation.submitted && !validation.dateToSend
                ? classes.inputError
                : ''
            }`}
          >
            <label
              htmlFor="datePicker"
              className={`flex-horizontal ${classes.formLabel}`}
            >
              Date To Send Notification
            </label>
            <Calendar
              id="datePicker"
              dateFormat="yy-mm-dd"
              value={date}
              showTime
              showSeconds
              className={`flex-horizontal ${classes.formValue}`}
              showIcon
              onChange={(e: any) => {
                setDate(e.value);
                handleDate(e.value);
              }}
              showButtonBar
            />
          </div>
          <div className={'flex-horizontal'}>
            <Button
              label={'Save Draft'}
              onClick={() => {
                setScheduled(false);
                submitFormHandler('DRAFT');
              }}
            />
            <Button
              label={'Schedule'}
              className={`${classes.submitButton}`}
              onClick={() => {
                setScheduled(true);
                submitFormHandler('SCHEDULED');
              }}
            />
            <Button
              label={'Send Now'}
              className={`${classes.submitButton}`}
              onClick={() => {
                setScheduled(false);
                submitFormHandler('SENDNOW');
              }}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default NotificationsForm;
