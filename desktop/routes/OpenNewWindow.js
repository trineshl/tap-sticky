import express from 'express';
import { createWindow } from '../invokeWindow.js';

const router = express.Router();

router.get('/', async (p_request, p_response) => {

  const LReqParams = p_request.query || {};

  const LWindow = await createWindow(false, LReqParams.newWindowId);

  p_response.json({
    success: true,
    newWindowKey: LWindow.customWindowKey
  });
});

export default router;