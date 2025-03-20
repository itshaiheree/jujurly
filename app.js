require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

// Setup session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Inisialisasi passport
app.use(passport.initialize());
app.use(passport.session());

// Setup Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Anda bisa menyimpan user ke database di sini
      return done(null, profile);
    }
  )
);

// Serialize user ke session
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes
app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`
      <h1>Halo, ${req.user.displayName}</h1>
      <p>Email: ${req.user.emails[0].value}</p>
      <img src="${req.user.photos[0].value}" alt="Profile" />
      <br><br>
      <a href="/logout">Logout</a>
    `);
  } else {
    res.send('<a href="/auth/google">Login dengan Google</a>');
  }
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/");
  }
);

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
