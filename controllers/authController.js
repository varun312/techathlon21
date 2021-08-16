const User = require("../models/User");
const jwt = require("jsonwebtoken");
const msal = require('@azure/msal-node');
const REDIRECT_URI = "http://localhost:3000/redirect";


const config = {
  auth: {
      clientId: "a9b1487a-35ca-4bf0-ba32-e410881fa5ce",
      authority: "https://login.microsoftonline.com/organizations",
      clientSecret: "uSGZxLpq~4ly08B.NZ.R3m8dQq~SR~2V.7"
  },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {},
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    }
};

const pca = new msal.ConfidentialClientApplication(config);

// create json web token
const maxAge = 14 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

// controller actions
module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.logout_get = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports.mslogin_get = async (req, res) => {
  const authCodeUrlParameters = {
    scopes: ["user.read"],
    redirectUri: REDIRECT_URI,
  };

  pca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
      res.redirect(response);

  }).catch((error) => console.log(JSON.stringify("Error\n", error)));  
};

module.exports.redirect_get = async (req, res) => {
  const tokenRequest = {
    code: req.query.code,
    scopes: ["user.read"],
    redirectUri: REDIRECT_URI,
  };

  pca.acquireTokenByCode(tokenRequest).then(async(response) => {
      try {
        const user = await User.findOrCreate({
          name:response.account.name,
          email:response.account.username,
        });

        const token = createToken(user.doc._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.redirect('/play')
      } catch (err) {
        console.log("AUTH CONTROLLER 76\n\n")
        console.log(err)
        res.status(400).json({ "errors":err });
      }
  }).catch((error) => {
      console.log("AUTH CONTROLLER 81\n\n")
      console.log(error);
      res.status(500).send(error);
  });
};