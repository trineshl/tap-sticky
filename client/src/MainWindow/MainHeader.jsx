import React from 'react'
import RestUtils from '../RestUtils';
import IconButton from '../IconButton';

function MainHeader() {

  const closeWindow = () => RestUtils.closeWindow();

  return (
    <div className='MainHeader HBox ElectronDraggable'>

      <IconButton imageIndex={1} additionalCls="IconBtn1" hint="New Note"
        onClick={() => RestUtils.createNewAndOpenWindow()}
      />
      <span className='Flex1'></span>
      <span style={{ margin: 0 }} className='MainHeaderText'>Tap Sticky</span>
      <span className='Flex1'></span>

      <IconButton
        imageIndex={2}
        additionalCls="IconBtn1 FontSizeSmall"
        hint="Close"
        onClick={closeWindow}
      />
    </div>
  )
}

export default MainHeader;