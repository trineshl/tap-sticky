import Quill from 'quill';
import "quill/dist/quill.core.css";
import 'quill/dist/quill.snow.css'; // Import the full Quill snow theme CSS

import React, { useEffect, useRef, useState } from 'react';

function Editor({ content, setContent }) {

  const LRichtextEditorRef = useRef();
  const LToolbarRef = useRef();
  const [quillState, setQuillState] = useState();
  const [isEditModeContentSet, setIsEditModeContentSet] = useState(false);

  const pvtFocus = (p_Quill) => {

    //Focus the editor and place the cursor at the end
    p_Quill.focus();
    const LLength = p_Quill.getLength(); // Get length of the content
    p_Quill.setSelection(LLength, LLength); // Set cursor at the end
  }

  useEffect(() => {

    const bindEvent = (p_Quill) => {
      p_Quill.on('text-change', () => {
        const LContent = p_Quill.getContents();// LQuill.getContents();

        setContent(LContent); // Update state with the content
      });
    };

    const unbindEvents = (p_Quill) => {
      p_Quill.off('text-change');
    };

    if (quillState) {
      bindEvent(quillState);
      return () => unbindEvents(quillState);
    }

    const LToolbarOptions = [
      ['bold', 'italic', 'underline', 'strike',
        { 'list': 'ordered' }, { 'list': 'check' }, { 'color': [] },
        { 'background': [] }, { 'align': [] }, 'clean'
      ],
    ];
    LToolbarOptions.container = LToolbarRef.current;

    const LQuill = new Quill(LRichtextEditorRef.current, {
      debug: false, // Disable console logging
      // debug: 'info',
      theme: 'snow', // Use the 'snow' theme to ensure toolbar styling
      modules: {
        toolbar: LToolbarOptions
      },
      placeholder: 'Start Writing...',
      content: content
    });

    // Set the contents of the editor using the Delta object
    //initial context
    LQuill.setContents(content);

    //Focus the editor and place the cursor at the end
    pvtFocus(LQuill);

    setQuillState(LQuill);

    bindEvent(LQuill);

    // Clean up on component unmount
    return () => unbindEvents(LQuill);
  }, [content, quillState, setContent]);

  // Update Quill content when `content` prop changes
  useEffect(() => {
    if (!isEditModeContentSet && quillState && content) {
      quillState.setContents(content);
      //Focus the editor and place the cursor at the end
      pvtFocus(quillState);
      setIsEditModeContentSet(true);
    }
  }, [quillState, content, isEditModeContentSet]);

  return (
    <div className="VBox Flex1 OverFlowAuto Editor">
      <div ref={LToolbarRef} style={{ backgroundColor: 'red' }}></div>
      <div className='Flex1 OverFlowAuto' ref={LRichtextEditorRef}></div>
    </div>
  )
}

export default Editor;