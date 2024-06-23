import { useEffect, useState } from 'react';
import './App.css';
import { AppCacheContext } from './Context/AppCacheContext';
import MainShell from './MainWindow/MainShell';
import LoadingDiv from './LoadingDiv';
import StickyShell from './StickyWindow/StickyShell';

function App() {

  const [lastSettings, setLastSetting] = useState({});
  const [isMainWindow, setIsMainWindow] = useState(null);

  useEffect(() => {
    window.electron.onInit((p_intWindowId, p_objLastSetting, p_boolIsMainWindow) => {

      window.electronAppId = p_intWindowId;

      setIsMainWindow(p_boolIsMainWindow === true);
      setLastSetting(p_objLastSetting || {});
    });

    document.addEventListener('keydown', function (event) {
      if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
        event.preventDefault();
      }

      // Prevent Ctrl+Shift+I or Cmd+Option+I (opening developer tools)
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'i') {
        event.preventDefault();
      }
    });
  }, []);

  return (
    <div className="RootContainer VBox Flex1">
      <AppCacheContext.Provider value={[lastSettings, setLastSetting]}>
        {
          isMainWindow === true ?
            <MainShell />
            :
            (isMainWindow === false ?
              <StickyShell />
              :
              <LoadingDiv text="Loading..." />
            )
        }
      </AppCacheContext.Provider>
    </div >
  );
}

export default App;
