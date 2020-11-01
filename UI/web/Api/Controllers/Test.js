const express = require('express') , router = express.Router()


  router.get('/testFolderPath', (req, res) => {
    
    res.send('Test Route Folder Path = ' + req.app.locals.folderPath ).status(200);
  })

  


module.exports = router