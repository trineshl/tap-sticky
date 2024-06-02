import express from 'express';
import { OpenedWindowRefs } from '../invokeWindow.js';

const router = express.Router();

router.get('/', (p_request, p_response) => {

  const LReqParams = p_request.query || {},
    LHeaders = p_request.headers || {};

  const LWindowKey = LHeaders['electron-app-id'],
    LAlwaysOnTopVal = (LReqParams.alwaysOnTopVal === 'true') || (LReqParams.alwaysOnTopVal === true);

  setAlwaysOnTop(LWindowKey, LAlwaysOnTopVal);

  p_response.json({
    success: true,
    alwaysOnTopVal: LAlwaysOnTopVal
  });
});

function setAlwaysOnTop(p_strKey, p_boolAlwaysOnTop) {

  p_boolAlwaysOnTop = p_boolAlwaysOnTop === true;

  const LWindow = OpenedWindowRefs[p_strKey];

  if (!LWindow) {
    return;
  }

  //This will make sure that window will always be on top if p_boolAlwaysOnTop=true, else vice versa.
  LWindow.setAlwaysOnTop(p_boolAlwaysOnTop);
}

export default router;