const bodyParser = require('body-parser')
const passportService = require('./service/passport')
const passport = require('passport')
const path = require('path')
const crypto = require('crypto')
const multer = require('multer')
const ProfesorContorller = require('./controllers/ProfesorContorller')
const UserController = require('./controllers/UserController')
const FileController = require('./controllers/FileController')

const CheckLevel = require('./service/CheckLevel');

var storage = multer.diskStorage({
  destination: './pic/orginal/',
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      if (err) return cb(err)
      cb(null, raw.toString('hex') + Date.now() + path.extname(file.originalname))
    })
  }
})

const upload = multer({ dest: 'pic/orginal/' })

const uploadWithExt = multer({ storage: storage })

var jsonParser = bodyParser.json()

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post('/login', jsonParser, requireSignin, UserController.login)
  app.post('/register', jsonParser, UserController.register)
  app.post('/addProfesor', jsonParser, requireAuth, ProfesorContorller.addProfesor)
  app.post('/addTimeClass', jsonParser, requireAuth, UserController.addTimeClass)
  app.get('/getProfesor', jsonParser, requireAuth, ProfesorContorller.getProfesor)
}
