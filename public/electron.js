const path = require('path');
const packager = require('electron-packager')
const snap = require('electron-installer-snap')
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({frame:false,
    width: 1920,
    height: 1080,
    minWidth: 1920,
    minHeight: 1080,
    useContentSize: true,
    frame: true,
    resizable: false,
    nodeIntegration: true
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:8080'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});



const arch = 'x6464'

packager({ dir: './target', platform: 'linux', arch: arch })
    .then(paths => snap({ src: paths[0], arch: arch }))
    .then(snapPath => {
        console.log(`Created snap at ${snapPath}!`)
    })