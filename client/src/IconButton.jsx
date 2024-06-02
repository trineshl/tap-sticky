import React from 'react'
import IconMapping from './IconMapping';

function IconButton(p_objProps) {
  return (
    <span onClick={p_objProps.onClick}>
      <IconMapping {...p_objProps} />
    </span>
  );
}

export default IconButton;