import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import COLORS from '../../../services/colors.service';

const Label = ({
  label, required, costumeStyles, htmlFor,
}: { label: string, required?: boolean, costumeStyles?: string, htmlFor?: string }) => {
  const classes = useStyles();

  return (
    <label htmlFor={htmlFor} className={classNames(classes.label, costumeStyles)}>
      {label}
      {required && <span>*</span>}
    </label>
  );
};

export default Label;

const useStyles = createUseStyles({
  label: {
    color: COLORS.blueWood,
    '& > span': {
      color: COLORS.lightBlue,
    },
  },
});
