const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const user = require('../db/users');
const key = require('../config/config')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: key.secretKey
}

module.exports = passport => {
    passport.use(
        new jwtStrategy(options, async(payload, done) => {
            const secret = await user.findUserWithKey(payload.findKey);
            if (secret === 0) done({ error: true }, false);
            else if (secret === 1) done(null, false);
            else {
                if (secret['secretkey'] == payload.secretKey) {
                    delete secret['secretkey'];
                    done(null, secret);
                } else {
                    done(null, false);
                }
            }
        })
    )
}