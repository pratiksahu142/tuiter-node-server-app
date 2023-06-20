import * as usersDao from "./users-dao.js";

var currentUserVar;

const AuthController = (app) => {

  const register = async (req, res) => {
    const user = await usersDao.findUserByUsername(req.body.username);
    if (user) {
      res.sendStatus(403);
      return;
    }
    const newUser = await usersDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    currentUserVar = newUser;
    res.json(newUser);
  };

  const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      const user = await usersDao.findUserByCredentials(username, password);
      if (user) {
        req.session["currentUser"] = user;
        currentUserVar = user;
            res.json(user);
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      if (!currentUserVar) {
        res.sendStatus(404);
      } else {
        res.json(currentUserVar);
      }
      return;
    }
    res.json(currentUser);
  };

  const logout = async (req, res) => {
    req.session.destroy();
    currentUserVar = null;
    res.sendStatus(200);
  };

  const update = (req, res) => {
    let currentUser = req.session["currentUser"];
    if (!currentUser && currentUserVar) {
      currentUser = currentUserVar;
    }
    currentUser.firstname = req.body.firstname;
    currentUser.lastname = req.body.lastname;

    usersDao.updateUser(currentUser);
    req.session["currentUser"] = currentUser;
    currentUserVar = currentUser;
    res.json(currentUser);

  };
  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/profile", profile);
  app.post("/api/users/logout", logout);
  app.put("/api/users/update", update);
};
export default AuthController;