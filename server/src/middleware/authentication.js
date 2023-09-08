const { getAllAdmins, getAllUsers } = require("../databaseapi");
const { compareHash } = require("../utils");
const { sendError } = require("../response.handler");
const jwt = require("jsonwebtoken");

const authenticate_login = async function (name, password, isAdmin=false) {
    let user = null;
    if (isAdmin) {
        user = getAllAdmins().find((e) => e.name === name);
    } else{
        user = getAllUsers().find((e) => e.name === name);
    }
    if (!user) {
        return false;
    }
    let pass = compareHash(password, user.passwordHash);
    return Promise.resolve(pass);
};

const authenticate_token = function (token, isAdmin=false) {
    if (isAdmin) {
        return jwt.verify(token, "ADMIN_SECRET");
    }
    return jwt.verify(token, "CLIENT_SECRET");
};

const authenticate_request = function (req, res, next, isAdmin=false) {
    let token = req.get("Authorization");
    if (!token) {
        sendError({ message: "Access denied" }, res);
        return;
    }
    let data = authenticate_token(token, isAdmin);
    if (data) {
        next();
    } else {
        sendError({ message: "Access Denied" }, res);
    }
};
const authenticate_request_admin = function (req, res, next) {
    authenticate_request(req, res, next, true);
}
const authenticate_request_user = function (req, res, next) {
    authenticate_request(req, res, next, false);
}


module.exports = { authenticate_login, authenticate_request_admin, authenticate_request_user };
