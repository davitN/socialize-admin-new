import classNames from 'classnames';
import { RadioButton } from 'primereact/radiobutton';
import { createUseStyles } from 'react-jss';
import Label from './Label';
import COLORS from '../../../services/colors.service';

const RadioButtonComponent = ({
  label, checked, onChange, costumeClasses,
}: { label: string, checked: boolean, onChange: Function, costumeClasses?: string }) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, costumeClasses)}>
      <RadioButton id={label} onChange={(e) => onChange(e)} checked={checked} />
      <Label htmlFor={label} label={label} costumeStyles="text-sm p-pl-2" />
    </div>
  );
};

export default RadioButtonComponent;

const useStyles = createUseStyles({
  root: {
    '& > .p-radiobutton': {
      width: '17px',
      height: '16px',
    },
    '& > div > .p-radiobutton-box': {
      border: `1px solid ${COLORS.blueWood} !important`,
      width: '17px',
      height: '16px',
      '& > .p-radiobutton-icon': {
        width: '9px',
        height: '9px',
      },
    },
    '& > div > .p-radiobutton-box:focus': {
      boxShadow: 'none !important',
    },
    '& > div > .p-focus': {
      boxShadow: 'none !important',
    },
    '& > div > .p-radiobutton-box.p-highlight': {
      background: `${COLORS.lightBlue} !important`,
    },
  },
  label: {
    color: COLORS.blueWood,
  },
});
