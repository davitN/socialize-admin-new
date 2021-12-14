/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { createUseStyles } from 'react-jss';
import COLORS from '../../../services/colors.service';

interface PropTypes {
  children: ReactNode;
  customClasses?: string;
  handleClick?: () => void;
  loading?: boolean,
  disabled?: boolean,
  bgColor?: string,
  textColor?: string,
  borderColor?: string,
}

const ButtonComponent: React.FC<PropTypes> = ({
  children,
  customClasses,
  handleClick,
  loading,
  disabled,
  bgColor = COLORS.white,
  textColor = COLORS.blueWood,
  borderColor = 'transparent',
}) => {
  const classes = useStyles({
    bgColor, textColor, borderColor,
  });

  return (
    <Button disabled={loading || disabled} className={classNames(customClasses, classes.root)} onClick={handleClick}>
      {loading ? <i className="pi pi-spin pi-spinner" style={{ fontSize: '1.3em' }} /> : children }
    </Button>
  );
};
export default ButtonComponent;

const styles = () => ({
  root: ({
    bgColor, textColor, borderColor,
  }:{ bgColor: string, textColor:string, borderColor:string }) => ({
    color: textColor,
    backgroundColor: bgColor,
    border: '1px solid transparent',
    width: '100%',
    fontWeight: 600,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    '&:hover': {
      background: `${bgColor} !important`,
      color: `${textColor} !important`,
      border: `1px solid ${borderColor} !important`,
    },
    '&:focus': {
      boxShadow: 'none !important',
      border: `1px solid ${borderColor} !important`,
    },
    '&:active': {
      background: `${bgColor} !important`,
      color: `${textColor} !important`,
      border: `1px solid ${borderColor} !important`,
    },
  }),
});

const useStyles = createUseStyles(styles);
