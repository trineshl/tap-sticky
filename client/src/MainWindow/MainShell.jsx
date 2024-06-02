import React, { useEffect, useState } from 'react'
import MainHeader from './MainHeader'
import IconButton from '../IconButton';
import RestUtils from '../RestUtils';
import LoadingDiv from '../LoadingDiv';

function MainShell() {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const GetNotes = async () => {

      const LResponse = await RestUtils.getAllNotes() || {},
        LNotes = LResponse.notes || [];

      setNotes(LNotes);
    };

    GetNotes();
  }, []);

  useEffect(() => {

    // This event will only fire if the main window is invoked (opened)
    // p_intUpdatedNoteId - is noteId which is updated
    const handleUpdateData = (p_intUpdatedNoteId, p_objUpdatedNoteData) => {

      p_intUpdatedNoteId = parseInt(p_intUpdatedNoteId);

      setNotes(prevNotes => {

        let LNoteUpdated = false;

        const LNewNotes = prevNotes.map(

          p_objNote => {
            // console.log(p_objNote.note_id);
            if (p_objNote.note_id !== p_intUpdatedNoteId) {
              return p_objNote;
            }

            LNoteUpdated = true;

            return {
              ...p_objNote,
              note_comment: p_objUpdatedNoteData.note_comment || ''
            };
          }
        );

        if (LNoteUpdated) {

          //here means, user has edited the note..
          return LNewNotes;
        }

        //here means, new note is added
        return [...prevNotes, { note_id: p_intUpdatedNoteId, ...p_objUpdatedNoteData }];
      });
    };

    window.electron.onUpdateData(handleUpdateData);

    // Cleanup the event listener on component unmount
    return () => {
      // window.electron.removeListener('update-data', handleUpdateData);
    };
  }, []);

  const emptyDiv = () => {
    return <LoadingDiv text="Tap the new note button above to create new note" />
  };

  const getNote = (p_objNote) => {
    return <div
      key={p_objNote.note_id}
      className='NoteItem HBox'>
      {p_objNote.note_comment}

      <span className='Flex1'></span>

      <IconButton
        imageIndex={7}
        additionalCls="IconBtn1 FontSizeSmall"
        hint="Edit"
        onClick={() => RestUtils.openNewWindow(p_objNote.note_id)}

      />

      <IconButton
        imageIndex={8}
        additionalCls="IconBtn1 FontSizeSmall"
        hint="Delete"
        onClick={() => { }}
      />
    </div>
  };

  return (
    <div className='VBox OverFlowAuto Flex1'>
      <MainHeader />
      <div className='VBox Flex1 OverFlowAuto'>
        {(notes && notes.length > 0) ?
          (notes.map((p_objRecord) => getNote(p_objRecord))) : emptyDiv()}
      </div>
    </div>
  );
}

export default MainShell;