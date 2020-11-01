const runExpressServer = require('./Api/App')
const FileAndFolderHelper = require('./Api/Helpers/FileAndFolderHelper')
const electron = require('electron');


const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
app.commandLine.appendSwitch('disable-web-security');

function createWindow() {

    runExpressServer(app.getPath("userData"));
    //alert(app.getPath('userData'));
    FileAndFolderHelper.initializeAppFolderStructure(app.getPath("userData"));

    // Create the browser window.
    mainWindow = new BrowserWindow(
        {
            width: 800,
            height: 600,
            'web-preferences': { 'web-security': false },
            'node-integration': 'iframe',
        });

    // and load the index.html of the app.
    //console.log(`file:///${__dirname}/build/index.html`)
    mainWindow.loadURL(`file:///${__dirname}/build/index.html`);

    // Open the DevTools.
    //mainWindow.webContents.openDevTools();

   //mainWindow.webContents.openDevTools();
    
    // Initialize the DB Connection
  

    // var con = mysql.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     password: "root",
    //     database: "abc_timetable"
    // });

    // con.connect(function (err) {
    //     if (err) throw err;
    //     console.log("Connected!");
    // });



    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null

        //close Server


    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.