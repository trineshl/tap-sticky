import _ from 'lodash';
import Constants from './Constants';

class RestUtils {

  /**
   * @method FireCommand
   * This method will fire the command on server and returns the response in promise
   * 
   * @public
   * @param {Object}: Options: {
   *    url: '',
   *    method: 'GET',
   *    headers: {
   *     "Content-Type": "application/json"
   *    },
   *    requestJson: {},
   *    callback: (Optional) (response) => {},
   *    loadingText: '',//Please wait...
   *    canShowLoadingMask: false
   *  }
   * @returns {Promise}
   */
  static FireCommand(p_objOptions) {

    const //LMe = this,
      LRequestOptions = {
        method: p_objOptions.method,
        headers: p_objOptions.headers || {
          "Content-Type": "application/json",
          "electron-app-id": (window.electronAppId || '')
        },
        body: JSON.stringify(p_objOptions.requestJson),
      };

    if (p_objOptions.method === 'GET') {
      delete LRequestOptions.body;
    }

    let LUrl = `${Constants.SERVER_BASE_URL}/${p_objOptions.url}`;

    const LPromise = new Promise((resolve, reject) => {

      //Start Loading
      if (p_objOptions.canShowLoadingMask === true) {
        // Store.dispatch(SetAppLoading((p_objOptions.loadingText || '')));
        // GenUtils.StartLoading(p_objOptions.loadingText || '');
      }//if..

      //fire command
      fetch(LUrl, LRequestOptions)
        .then((response) => response.json())
        .then(
          (responseJson) => {

            if (responseJson.success === false) {
              reject(responseJson);
            }
            else {
              resolve(responseJson);
            }

          },
          (error) => {
            resolve(error);
          }
        );
    });

    LPromise.finally(() => {

      //Stop loading, if we started
      if (p_objOptions.canShowLoadingMask === true) {
        // Store.dispatch(SetAppLoading(false));
        // GenUtils.StopLoading();
      }//if..
    });

    if (_.isFunction(p_objOptions.callback)) {

      LPromise.then(p_objOptions.callback, p_objOptions.callback);
    }

    return LPromise;
  }

  static setAlwaysOnTop(p_boolAlwaysShow) {

    return this.FireCommand({
      url: 'setAlwaysOnTop?alwaysOnTopVal=' + (p_boolAlwaysShow === true)
    });
  }

  static closeWindow() {

    return this.FireCommand({
      url: 'closeWindow'
    });
  }

  static openNewWindow(p_intId) {
    return this.FireCommand({
      url: 'openNewWindow?newWindowId=' + p_intId
    });
  }

  static openMainWindow() {
    return this.FireCommand({
      url: 'openMainWindow'
    });
  }

  static createNewAndOpenWindow() {

    const LMe = this;
    return LMe.createNote().then((p_objResponse) => {

      const LNoteResponse = p_objResponse.note || {};
      return LMe.openNewWindow(LNoteResponse.note_id);
    });
  }

  static getAllNotes() {
    return this.FireCommand({
      url: 'notes'
    });
  }

  static getNoteById(p_intId) {
    return this.FireCommand({
      url: 'notes/' + p_intId
    });
  }

  static updateNoteById(p_intId, p_objRequestJSON) {
    return this.FireCommand({
      url: 'notes/' + p_intId,
      method: 'PUT',
      requestJson: p_objRequestJSON
    });
  }

  static createNote(p_objRequestJSON) {
    return this.FireCommand({
      url: 'notes/',
      method: 'POST',
      requestJson: p_objRequestJSON || {
        note_comment: JSON.stringify({ "ops": [{ "insert": "\n" }] })
      }
    });
  }

  static deleteNoteById(p_intId) {
    const LConfirmed = window.confirm('Are you sure you want to delete this note?');

    if (!LConfirmed) {
      return; // Exit if user cancels the delete action
    }

    return this.FireCommand({
      url: 'notes/' + p_intId,
      method: 'DELETE'
    });
  }

  static debounce(func, delay, scope) {
    let timeoutId;

    return function (...args) {
      const context = scope;

      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }

  static getAppImageURL() {
    return 'http://localhost:5000/img/icon.png';
  }
}

export default RestUtils;