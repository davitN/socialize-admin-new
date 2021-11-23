import React, { useState } from "react"

const CvSwitcher = (props: any) => {
  const [active, setActive] = useState(false);
  function onSwitch() {
    props.onChange(!active);
    setActive(!active);
  }
  return (
      <div className={`cv-switcher-wrapper ${active ? 'active' : ''}`} onClick={() => onSwitch()}>
        <div className="point" />
        <span>{active ? 'Yes' : 'No'}</span>
      </div>
  );
}

export default CvSwitcher;
