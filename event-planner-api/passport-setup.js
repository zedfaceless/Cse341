// passport-setup.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user');

// Decide callback URL based on environment
const callbackURL =
  process.env.NODE_ENV === 'production'
    ? process.env.GOOGLE_CALLBACK_URL_PROD
    : process.env.GOOGLE_CALLBACK_URL_LOCAL;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 1. Try to find existing user by googleId
        let user = await User.findOne({ googleId: profile.id });

        // 2. If not found, check if email already exists
        if (!user) {
          const email = profile.emails && profile.emails[0]?.value;
          if (email) {
            user = await User.findOne({ email: email });
          }
        }

        // 3. If still not found, create a new user
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: profile.emails && profile.emails[0]?.value,
            username: (profile.displayName || `user${Date.now()}`)
              .replace(/\s+/g, '')
              .toLowerCase(),
            firstName: profile.name?.givenName,
            lastName: profile.name?.familyName,
          });
        } else if (!user.googleId) {
          // 4. If user exists by email but has no googleId, link Google account
          user.googleId = profile.id;
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
