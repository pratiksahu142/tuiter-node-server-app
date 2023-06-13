import {
  findUserByUsername,
  findUserByCredentials,
  createUser,
  updateUser, findUserById
} from "./users-dao.js";

const AuthController = (app) => {

  const register = (req, res) => {

    const newUser = createUser(req.body);
    console.log(newUser);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };

  const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = findUserByCredentials(username, password);
    if (user) {
      req.session["currentUser"] = user;
      console.log('@@@')
      console.log(user)
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
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
    const currentUser = req.session["currentUser"];
    currentUser.firstname = req.body.firstname;
    currentUser.lastname = req.body.lastname;

    updateUser(currentUser);
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