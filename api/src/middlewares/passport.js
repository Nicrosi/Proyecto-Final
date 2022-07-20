const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const passport = require("passport");
const { User } = require("../db");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  "sign-up-google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      /* return done(null, { profile: "profile" }); */
      const user = await User.findOne({
        where: {
          e_mail: profile.emails[0].value,
        },
      });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    }
  )
);
