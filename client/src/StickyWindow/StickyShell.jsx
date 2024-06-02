import React, { useCallback, useEffect, useMemo, useState } from 'react'
import StickyHeader from './StickyHeader';
import Editor from './Editor';
import RestUtils from '../RestUtils';

function StickyShell() {

  const [content, setContent] = useState();

  useEffect(() => {

    const LFetchData = async () => {

      try {
        const LResponse = await RestUtils.getNoteById(window.electronAppId) || {};
        if (LResponse.success === false) return;

        const LNoteRecord = LResponse.note || {},
          LJsonString = LNoteRecord.note_comment || '';

        if (LJsonString) {
          const LArr = JSON.parse(LJsonString);
          setContent(LArr || []);
        }
      } catch (p_error) {

      }
    };

    LFetchData();
  }, []);

  const LSaveFn = useCallback((p_content) => {

    RestUtils.updateNoteById(window.electronAppId, {
      note_comment: JSON.stringify(p_content)
    });
  }, []);

  const LSaveDebounceFn = useMemo(() => RestUtils.debounce(LSaveFn, 800, this), [LSaveFn]);

  return (
    <>
      <StickyHeader />
      <Editor content={content}
        setContent={(p_content) => {

          //deep comparing..
          if (JSON.stringify(p_content) === JSON.stringify(content)) {
            return;
          }
          setContent(p_content);
          LSaveDebounceFn(p_content)
        }} />
    </>
  );
}

export default StickyShell; 