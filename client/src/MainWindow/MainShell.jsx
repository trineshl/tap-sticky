import React, { useCallback, useEffect, useState } from 'react'
import MainHeader from './MainHeader'
import IconButton from '../IconButton';
import RestUtils from '../RestUtils';
import LoadingDiv from '../LoadingDiv';

function MainShell() {

  const [notes, setNotes] = useState([]);
  const [isAppScreenPaperVisible, setAppScreenPaperVisible] = useState(true);

  const getFirst100Chars = useCallback((p_objNote) => {
    //Parse the JSON object
    const content = JSON.parse(p_objNote);
    let LText = '';

    //Iterate through the ops array to extract the text
    for (let i = 0; i < content?.ops?.length; i++) {
      if (content.ops[i]?.insert) {
        LText += content.ops[i]?.insert;
        if (LText.length >= 100) {
          return LText.substring(0, 100);
        }
      }
    }

    //If the total length is less than 100, return the whole text
    return LText?.trim() || <i>&lt;&lt;Empty Note&gt;&gt;</i>;
  }, []);

  useEffect(() => {
    const GetNotes = async () => {

      const LResponse = await RestUtils.getAllNotes() || {},
        LNotes = LResponse.notes || [];

      setNotes(LNotes);
    };

    GetNotes();

    //stop screen
    setTimeout(() => {
      setAppScreenPaperVisible(false);
    }, 1000);
  }, []);

  useEffect(() => {

    // This event will only fire if the main window is invoked (opened)
    // p_intUpdatedNoteId - is noteId which is updated
    const handleUpdateData = (p_intUpdatedNoteId, p_objUpdatedNoteData, p_strActionCode) => {

      p_intUpdatedNoteId = parseInt(p_intUpdatedNoteId);

      setNotes(prevNotes => {

        if (p_strActionCode === 'UPDATE') {
          //here means, user has edited the note..
          return prevNotes.map(p_objNote => {

            if (p_objNote.note_id !== p_intUpdatedNoteId) {
              return p_objNote;
            }

            return {
              ...p_objNote,
              note_comment: p_objUpdatedNoteData.note_comment || ''
            };
          });
        }

        if (p_strActionCode === 'CREATE') {
          //here means, new note is added
          return [...prevNotes, { note_id: p_intUpdatedNoteId, ...p_objUpdatedNoteData }];
        }

        if (p_strActionCode === 'DELETE') {
          // here means, note is deleted
          return prevNotes.filter(p_objNote => p_objNote.note_id !== p_intUpdatedNoteId);
        }
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
      onClick={() => RestUtils.openNewWindow(p_objNote.note_id)}
      className='NoteItem HBox'>
      {getFirst100Chars(p_objNote.note_comment)}

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
        onClick={(e) => {
          e.stopPropagation();
          RestUtils.deleteNoteById(p_objNote.note_id);
        }}
      />

      <IconButton
        imageIndex={9}
        additionalCls="IconBtn1 FontSizeSmall"
        hint="Clear cached window configs like window size, position, etc."
        onClick={(e) => {
          e.stopPropagation();
          RestUtils.updateNoteById(p_objNote.note_id, {
            window_config: null
          }, { Canupdatemainwindow: false });
        }}
      />
    </div>
  };

  const getContent = () => {

    return <div className='VBox Flex1 OverFlowAuto'>
      {(notes && notes.length > 0) ?
        (notes.map((p_objRecord) => getNote(p_objRecord))) : emptyDiv()}
    </div>;
  };

  const getAppPaper = () => {
    return <div className='CenterAndMiddle' style={{ margin: '0 0 0 10px' }}>
      <img alt='Welcome' className='StartScreenPaper' src={RestUtils.getAppImageURL()} />
    </div>
  };

  return (
    <div className='VBox OverFlowAuto Flex1'>
      <MainHeader />
      {isAppScreenPaperVisible ? getAppPaper() : getContent()} 
    </div>
  );
}

export default MainShell;