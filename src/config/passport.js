const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require('../models/user');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRETORKEY;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};

// passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
//     try {
//         const user = await User.findById(jwt_payload.id);
//         if (!user) {
//             return done(null, user);
//         }
//         return done(null, false);
//     } catch (error) {
//         return done(error, false);
//     }
// }));

// module.exports = passport;