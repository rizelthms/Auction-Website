/* Represents a single item listed as an auction on the site. */
class User {
    constructor(id, name, passwordHash, isAdmin) {
        this.id = id;
        this.name = name;
        this.passwordHash = passwordHash;
        this.isAdmin = isAdmin;
    }
}

module.exports = User;