const express = require('express')
  , router = express.Router()

router.use('/testRoutes', require('./Test'))


module.exports = router