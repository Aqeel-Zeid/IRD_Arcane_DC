const fs = require('fs');
 
//Initialize App Data Folder with Structure 
function initializeAppFolderStructure(baseFolderName) {
    
    const appFolderName = baseFolderName + `/IRD_Arcane_DC`;

    if(isInitialized(appFolderName) !== true )
    {
        //console.log("Directory Doesnt Exist", appFolderName)
        fs.mkdirSync(appFolderName)


        fs.writeFile( appFolderName +  `ird_arcanedc.sqlite`, '', function (err) {
            if (err) throw err;
            console.log('Database File is created successfully.');
          });
    }
    else
    {
        //console.log("Directory Exist")
    }

}

function getDBFileLocation(){

    var express = require('express')
    var cors = require('cors')

    var express_app = express();
    var bodyParser = require('body-parser');


    express_app.use(cors());

    let folderpath
    express_app.listen(3000, function () {
        folderpath = express_app.locals.folderPath;
    })

    return `${folderpath}/IRD_Arcane_DC/ird_arcanedc.sqlite`

} 


//Check Wether the Application Folder Structure exist in the OS dependent APP data Directory
function isInitialized(dir){
    
    if (fs.existsSync(dir)) {
        return true;
    } else {
        return false;
    }

}

module.exports = {
    initializeAppFolderStructure,
    isInitialized,
    getDBFileLocation
}