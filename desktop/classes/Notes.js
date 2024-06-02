import DBBase from "./DBBase.js";

const LTableName = 'notes';

async function getAllNotes() {
  try {
    const allRecords = await DBBase.getAllRecords(LTableName);
    return allRecords;
  } catch (error) {
    console.error('Error fetching all records:', error);
  }
}

async function getNoteById(p_intNoteId) {

  try {

    const singleRecord = await DBBase.getRecordById(LTableName, p_intNoteId, 'note_id');
    return singleRecord;
  } catch (error) {
    console.error(`Error fetching record with ID ${p_intNoteId}:`, error);
  }
}

async function createNote(record) {
  try {
    const createResult = await DBBase.createRecord(LTableName, record, 'note_id');
    return createResult;
  } catch (error) {
    console.error('Error creating record:', error);
  }
}

async function updateNoteById(noteId, record) {
  try {
    const updateResult = await DBBase.editRecord(LTableName, noteId, record, 'note_id');
    return updateResult;
  } catch (error) {
    console.error(`Error updating record with ID ${noteId}:`, error);
  }
}

async function deleteNoteById(noteId) {
  try {
    const deleteResult = await DBBase.deleteRecord(LTableName, noteId, 'note_id');
    return deleteResult;
  } catch (error) {
    console.error(`Error deleting record with ID ${noteId}:`, error);
  }
}

export { getAllNotes, getNoteById, createNote, updateNoteById, deleteNoteById };