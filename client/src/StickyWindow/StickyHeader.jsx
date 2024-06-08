import React, { useContext } from 'react'
import IconButton from '../IconButton'
import RestUtils from '../RestUtils';
import { AppCacheContext } from '../Context/AppCacheContext';

function StickyHeader() {

  const [LLastSettings, setLastSetting] = useContext(AppCacheContext) || {},
    LAlwaysOnTop = LLastSettings.alwaysOnTop === true;

  const toggleAlwaysOnTop = () => {
    RestUtils.setAlwaysOnTop(!LAlwaysOnTop).then((p_objResponse) => {

      p_objResponse = p_objResponse || {};

      setLastSetting({ ...LLastSettings, alwaysOnTop: p_objResponse.alwaysOnTopVal });
    });
  };

  const closeWindow = () => RestUtils.closeWindow();

  return (
    <div className='Header HBox ElectronDraggable'>

      <IconButton imageIndex={1} additionalCls="IconBtn1" hint="New Note"
        onClick={() => RestUtils.createNewAndOpenWindow()}
      />
      <span className='Flex1'></span>

      <IconButton
        imageIndex={8}
        additionalCls="IconBtn1 FontSizeSmall"
        hint="Delete"
        onClick={() => RestUtils.deleteNoteById(window.electronAppId)}
      />

      <IconButton imageIndex={6} additionalCls="IconBtn1 FontSizeSmall" hint="View all Notes"
        onClick={() => RestUtils.openMainWindow()}
      />

      <IconButton imageIndex={LAlwaysOnTop ? 5 : 4}
        additionalCls="IconBtn1 FontSizeSmall"
        hint={!LAlwaysOnTop ? 'Pin to the top' : 'Unpin from the top'}
        onClick={toggleAlwaysOnTop}
      />

      <IconButton
        imageIndex={2}
        additionalCls="IconBtn1 FontSizeSmall"
        hint="Close"
        onClick={closeWindow}
      />
    </div>
  )
}

export default StickyHeader;