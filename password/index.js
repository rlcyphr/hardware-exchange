
var crypto = require('crypto');

module.exports = {

    hashSync: (password) => {
        const salt = crypto.randomBytes(128).toString('base64');
        const hash = crypto.pbkdf2Sync(
            password,
            salt,
            1000,
            64,
            'sha256').toString('hex');
        return (hash + '|' + salt);
    },

    compare: (password, hash) => {
        const salt = hash.split('|')[1];
        const testpass = crypto.pbkdf2Sync(
            password,
            salt,
            1000,
            64,
            'sha256').toString('hex');

        let verify = testpass + '|' + salt;
        return (verify == hash);
    }

}