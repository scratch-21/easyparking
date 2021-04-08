const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//in case of a serialization issue with user on login or sign up (place in file where user was created)
 passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
    done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.SERVER_CLIENT_ID,
  clientSecret: process.env.SERVER_CLIENT_SECRET,
  callbackURL: "/auth/google/oauthtg",
  //possibly not needed
  // userProfileURL: "http://www.googleapis.com/oauth2/v3/userinfo"
},
function(accessToken, refreshToken, profile, done) {
    console.log('Google function' , profile.name, profile.emails);
  // User.findOrCreate({ googleId: profile.id }, function (err, user) {
  //   return done(err, user);
  // })
  return done(null, profile);
}
));
