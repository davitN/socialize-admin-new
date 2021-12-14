import { FC, ReactNode } from 'react';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import COLORS from '../../../services/colors.service';

interface PropsTypes {
  value: string | number | null;
  handleChange?: (val: string) => void;
  label?: string;
  placeholder?: string;
  type?: string;
  customClasses?: string;
  icon?: ReactNode
  required?: boolean,
  desc?: string,
  disabled?: boolean
}

const TextInput: FC<PropsTypes> = ({
  value, handleChange, label, placeholder, type = 'text', customClasses, icon, required, desc, disabled,
}) => {
  const classes = useStyles();

  return (
    <span className={classNames(classes.fullWidth, 'p-field p-mb-0', icon && 'p-input-icon-left', customClasses)}>
      {label && (
        <label htmlFor="label" className={classNames(classes.textColor)}>
          {label}
          {desc && <p className={classes.desc}>{desc}</p>}
        </label>
      )}
      {icon && icon}
      <InputText
        id="label"
        disabled={disabled}
        value={value || ''}
        placeholder={placeholder}
        onChange={({ target }) => handleChange && handleChange(target.value)}
        type={type}
        className={'form-control'}
      />
    </span>
  );
};

export default TextInput;

const useStyles = createUseStyles({
  fullWidth: {
    width: '100%',
  },
  root: {
    width: '100%',
    backgroundColor: COLORS.white,
    '&:hover': {
      borderColor: `${COLORS.lightBlue}`,
    },
    '&:focus': {
      boxShadow: 'none',
      borderColor: `${COLORS.lightBlue}`,
    },
    '&:disabled': {
      cursor: 'not-allowed',
      pointerEvents: 'all',
    },
  },
  textColor: {
    color: COLORS.blueWood,
    '& > span': {
      color: COLORS.lightBlue,
    },
  },
  desc: {
    color: COLORS.blueWood,
    fontSize: '0.65rem',
    opacity: 0.8,
    marginTop: '0.3rem',
  },
});
