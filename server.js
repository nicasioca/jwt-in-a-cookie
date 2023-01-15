// server.js
const express = require('express');
const { expressjwt: jwt } = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
var cookieParser = require('cookie-parser')
const { doubleCsrf } = require("csrf-csrf");
const cors = require('cors');

const cookieOptions = {
  // domain: 'codebuildrun.com' 
  // expires: 
  httpOnly: true,
  sameSite: 'strict',
  path: '/',
  // secure: true
};

const {
  generateToken,
  doubleCsrfProtection
} = doubleCsrf({
  getSecret: () => 'completely-different-secret123', // use a better secret! Don't use the same secret for the JWT.
  cookieName: 'CODEBUILDRUN_X_CSRF_TOKEN',
  cookieOptions,
  size: 64, // The size of the generated tokens in bits.
  ignoredMethods: ['GET', 'HEAD', 'OPTIONS'], // A list of request methods that will not be protected.
  getTokenFromRequest: (req) => req.headers['x-csrf-token'], // A function that returns the token from the request.
});
const app = express();

app.use(cors());


const jwtSecret = 'secret123'; // use a better secret! Keep in environmental variables instead.

app.get('/jwt', (req, res) => {
    const token = jsonwebtoken.sign({ user: 'nicasioca' }, jwtSecret);
    res.cookie('CODEBUILDRUN_TOKEN', token, cookieOptions);
    res.json({ token });
    console.log(token);
});

const foods = [
  { id: 1, description: 'burritos' },
  { id: 2, description: 'quesadillas' },
  { id: 3, description: 'churos' }
];

app.use(cookieParser());
app.use(
  jwt({
    secret: jwtSecret,
    getToken: req => req.cookies['CODEBUILDRUN_TOKEN'],
    algorithms: ['HS256']
  })
);

app.get('/cookie', function (req, res) {
    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies);
    res.json(req.cookies);
    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies);
  })

app.get('/food', (req, res) => {
  res.json(foods);
});

app.get('/csrf-token', (req, res) => {
  return res.json({ csrfToken: generateToken(res, req) });
});
app.use(doubleCsrfProtection);

app.post('/foods', (req, res) => {
  foods.push({
    id: foods.length + 1,
    description: 'new food'
  });
  res.json({
    message: 'Food created!'
  });
});



app.listen(3001);
console.log('App running on localhost:3001');