import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';


const CvSwitcher: React.FC<{ onChange: Function, defaultValue: boolean, readonly: boolean }> = ({ onChange, defaultValue, readonly }) => {
  const [active, setActive] = useState(false);
  const onSwitch = () => {
    if (readonly) {
      return;
    }
    onChange(!active);
    setActive(!active);
  };
  useEffect(() => {
    setActive(defaultValue);
  }, [defaultValue]);

  return (
    <div
      className={`cv-switcher-wrapper ${active ? 'active' : ''}`}
      onClick={() => onSwitch()}
    >
      <div className="point" />
      <span>{active ? 'Yes' : 'No'}</span>
    </div>
  );
};

export default CvSwitcher;

CvSwitcher.propTypes = {
  onChange: PropTypes.func.isRequired
};
