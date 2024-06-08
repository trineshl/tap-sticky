import express from 'express';
import { OpenedWindowRefs } from '../invokeWindow.js';

const router = express.Router();

router.get('/', (p_request, p_response) => {

  const LHeaders = p_request.headers || {};

  const LWindowKey = LHeaders['electron-app-id'];

  const LIsClosed = closeWindow(LWindowKey);

  p_response.json({
    success: true,
    windowClosed: LIsClosed
  });
});

export function closeWindow(p_strKey) {

  const LWindow = OpenedWindowRefs[p_strKey];

  if (LWindow && LWindow.isDestroyed() === false) {

    LWindow.close();
    return true;
  }

  return false;
}

export default router;