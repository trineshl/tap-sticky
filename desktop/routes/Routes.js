import SetAlwaysOnTop from './SetAlwaysOnTop.js';
import CloseWindow from './CloseWindow.js';
import OpenNewWindow from './OpenNewWindow.js';
import OpenMainWindow from './OpenMainWindow.js';
import NoteRoutes from './NoteRoutes.js';

const pvtMiddleWire = async (p_objReq, p_objRes, next) => {

  //Here means session exists
  next();
};

const Routes = (expressApp) => {

  expressApp.get("/", (p_objReq, p_objRes) => {
    p_objRes.send('{"response": "Welcome to the Tap Sticky APIs."}');
  });

  // expressApp.use("/signup", Signup);
  // expressApp.use("/login", Login);
  // expressApp.use("/checksession", CheckSession);

  //MiddleWire will apply on below commands
  expressApp.use(pvtMiddleWire);

  expressApp.use("/setAlwaysOnTop", SetAlwaysOnTop);
  expressApp.use("/closeWindow", CloseWindow);
  expressApp.use("/openNewWindow", OpenNewWindow);
  expressApp.use("/notes", NoteRoutes);
  expressApp.use("/openMainWindow", OpenMainWindow);
  // expressApp.use("/users", CRUDRouter(Users));
  // expressApp.use("/projects", ProjectRouter());
};

export default Routes;