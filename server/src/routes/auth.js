const express = require("express");
const { authenticate_login } = require("../middleware/authentication.js");
const {
    getAnyUserByName,
    getUserByName,
    addANewUser,
} = require("../databaseapi");
const { sendError, sendSuccess } = require("../response.handler");
const { createUser, createAuthToken } = require("../utils");

async function on_request_login(req, res, isAdmin) {
    let { name, password } = req.body;
    let pass = await authenticate_login(name, password, isAdmin);
    if (pass) {
        user = getAnyUserByName(name, isAdmin);
    } else {
        sendError({message: "Invalid User or Password"}, res);
        return;
    }
    let token = createAuthToken(user, isAdmin);
    sendSuccess({ user, token }, res);
}

const router = express.Router();

router.post("/", async (req, res) => {
    // @todo check the credentials and return an appropriate response
    // For testing purposes a dummy token is returned.
    res.json({
        token: "dummyt0k3nv4lu3!",
    });
});

router.post("/admin/login", async (req, res) => {
    let isAdmin = true;
    on_request_login(req, res, isAdmin);
});

router.post("/user/login", async (req, res) => {
    let isAdmin = false;
    on_request_login(req, res, isAdmin);
});

router.post("/create/user", async (req, res) => {
    let { name, password } = req.body;

    if (!(name || password)) {
        sendError({message: "Enter name and password"}, res);
        return;
    }

    if (password.length < 5) {
        sendError({message: "Password must be at least 5 characters long"}, res);
        return;
    }

    let exist = getUserByName(name);
    if (exist) {
        sendError({message: "User already exists."}, res);
        return;
    }

    let user = createUser({ name, password });

    user = addANewUser(user);
    sendSuccess({ message: user.user }, res);
});
module.exports = router;

