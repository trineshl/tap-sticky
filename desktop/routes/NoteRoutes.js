import express from 'express';
import { getAllNotes, updateNoteById, getNoteById, createNote } from '../classes/Notes.js';
import { OpenedWindowRefs } from '../invokeWindow.js';


const router = express.Router();

router.get('/', async (p_request, p_response) => {

  // const LRequestJSON = p_request.body || {};
  /**
   * Expected Request JSON (LRequestJSON):
   *  {
        "email": "ramnand@sample.com",
        "password": "Ramnand@123",
        "company_name": "Ramnand Pvt Ltd.",
        "first_name": "Ramnand",
        "last_name": "RamnandL"
      }
   */

  try {

    const LNotes = await getAllNotes();

    p_response.json({
      success: true,
      notes: LNotes
    });

  }
  catch (p_error) {
    p_response.json({
      success: false,
      error: p_error
    });
  }
});

router.get('/:id', async (p_request, p_response) => {

  const LRequestJSON = p_request.params || {};

  try {

    const LNotes = await getNoteById(LRequestJSON.id);

    p_response.json({
      success: true,
      note: LNotes
    });
  }
  catch (p_error) {
    p_response.json({
      success: false,
      error: p_error
    });
  }
});

const LUpdateMainWindow = (p_intWindowId, p_objUpdatedNoteData) => {

  setTimeout(() => {

    //getting main window,from window refs..
    const LMainWindow = OpenedWindowRefs.mainWindow;

    //if main window is not opened, then return..
    if (!LMainWindow) return;

    console.log("Main Window Updated.");

    //update main window, that data is changed..
    LMainWindow.webContents.send('onUpdateData', p_intWindowId, p_objUpdatedNoteData);
  });
};

router.put('/:id', async (p_request, p_response) => {

  const LRequestJSON = p_request.body || {};

  try {

    const LNoteId = p_request.params.id;

    const LNote = await updateNoteById(LNoteId, LRequestJSON);

    p_response.json({
      success: true,
      note: LNote
    });

    //let main window know that some window's data is changed.
    LUpdateMainWindow(LNoteId, LRequestJSON)
  }
  catch (p_error) {
    p_response.json({
      success: false,
      error: p_error
    });
  }
});

router.post('/', async (p_request, p_response) => {

  const LRequestJSON = p_request.body || {};

  try {

    const LNote = await createNote(LRequestJSON);

    p_response.json({
      success: true,
      note: LNote
    });

    //let main window know that some window's data is changed.
    LUpdateMainWindow(LNote.note_id, LRequestJSON);
  }

  catch (p_error) {
    p_response.json({
      success: false,
      error: p_error
    });
  }
});

export default router;
