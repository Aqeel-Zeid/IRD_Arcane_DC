const { Sequelize } = require('sequelize');

function DB_middleware_builder(db_connection) {
        return function (req, res , next) {
            req.db_connection = db_connection
            next()
        }
}

async function runExpressServer(applicationFolderPath) {

    var express = require('express')
    var cors = require('cors')

    var express_app = express();
    var bodyParser = require('body-parser');


    express_app.use(cors());
    //start body-parser configuration
    express_app.use(bodyParser.json());       // to support JSON-encoded bodies
    express_app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));

    //Creating Database Connection 
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: `${applicationFolderPath}/IRD_Arcane_DC/ird_arcanedc.sqlite`
      });

    //Test DB Connection 
    try {
            
            await sequelize.authenticate();
            //Initialize The Tables
         
            //Define Relationships

            // SessionDAO.belongsTo(SessionDAO)


            express_app.use(DB_middleware_builder(sequelize))
            console.log('Database Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

   
    //end body-parser configuration


    //app.use(express.static(__dirname + '/public'))
    //app.use(require('./middlewares/users'))
    express_app.use(require('./Controllers/index'))

    //express_app.locals.folderPath = applicationFolderPath

    

    express_app.listen(3000, function () {
        console.log('Listening on port 3000...')
    })
}

module.exports = runExpressServer
