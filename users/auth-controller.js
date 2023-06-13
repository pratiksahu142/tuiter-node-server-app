import {
  findUserByUsername,
  findUserByCredentials,
  createUser,
  updateUser,
  findUserById
} from "./users-dao.js";
var currentUserVar;

const AuthController = (app) => {

  const register = (req, res) => {
    const username = req.body.username;
    const user = findUserByUsername(username);
    if (user) {
      res.sendStatus(409);
      return;
    }
    const newUser = createUser(req.body);
    req.session["currentUser"] = newUser;
    currentUserVar = newUser;
    res.json(newUser);
  };

  const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = findUserByCredentials(username, password);
    if (user) {
      req.session["currentUser"] = user;
      currentUserVar = newUser;
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  };

  const profile = (req, res) => {
    const currentUser = currentUserVar;
    if (!currentUser) {
      res.sendStatus(404);
      return; }
    res.json(currentUser);
  };

  const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const update = (req, res) => {
    const currentUser = currentUserVar;
    currentUser.firstname = req.body.firstname;
    currentUser.lastname = req.body.lastname;

    updateUser(currentUser);
    currentUserVar = currentUser;
    req.session["currentUser"] = currentUser;
    res.json(currentUser);

  };
  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/profile", profile);
  app.post("/api/users/logout", logout);
  app.put("/api/users/update", update);
};
export default AuthController;