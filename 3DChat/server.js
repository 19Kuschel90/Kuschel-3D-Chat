class CMyTime {

    constructor(Name = "SERVER") {
        this.Name = Name;
    }

    ////////////////////////////////////////////
    // return time as string
    getTimeNow() {
        var dt = new Date();
        var utcDate = dt.toUTCString();
        return utcDate;
    }

    /////////////////////////////////////////////////
    // return void and post cosole log
    CL(Srting) {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log(this.getTimeNow() + " " + this.Name + ": " + Srting);
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

    }
}
var time = new CMyTime();

var express = require('express');
const fileUpload = require('express-fileupload');
var bodyParser = require("body-parser")
const path = require('path');
var app = express();
const root = './dist/public'; // export folder
const port = 4000;
var server = app.listen(process.env.PORT || port);
app.use(express.static(root));
app.set('port', process.env.PORT || port); // z.B: PORT=9000 npm start
time.CL('is running ' + app.get('port'));

app.use(express.static(root));
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var siofu = require("socketio-file-upload");
// var app = express()
app.use(siofu.router)
    // .listen(port);

app.get('/', function(request, response) {
    // time.CL('requst is  ' + request);
    response.sendFile(path.resolve(__dirname, root, 'index.html'));
});

app.get('/EDITOR', function(request, response) {
    // time.CL('requst is  ' + request);
    response.sendFile(path.resolve(__dirname, root, 'index.html'));
});

app.get('/CHAT', function(request, response) {
    // time.CL('requst is  ' + request);
    response.sendFile(path.resolve(__dirname, root, 'index.html'));
});

app.post('/EDITOR', function(request, response) {
    console.log('request', request.body["UserName"]);
    console.log('request', request.body['password']);
    // console.log('response', response.UserName);
    response.sendFile(path.resolve(__dirname, root, 'index.html'));

});


app.post('/CHAT', function(req, res) {

    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // console.log(req.files);
    // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    // console.log(req.files.sampleFile[0]);
    let index = 0;
    console.log(req.files.sampleFile);
    if (typeof req.files.sampleFile != "undefined") {

        if (Array.isArray(req.files.sampleFile)) {

            req.files.sampleFile.forEach(element => {
                index++;
                // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
                createFile(element, index);



                // let sampleFile = req.files.sampleFile[0];

                // console.log(sampleFile);
                // Use the mv() method to place the file somewhere on your server
            });
        } else {
            createFile(req.files.sampleFile, 666);
        }
    }
    res.sendFile(path.resolve(__dirname, root, 'index.html'));
});



function createFile(input, index) {
    input.mv(`dist/public/uploadimg/filename${index}.png`, function(err) {
        try {

            if (err)
                return res.status(500).send(err);

            // res.send('File uploaded!');
            console.log("file uploaded");

        } catch (error) {
            console.log("file uploaded fail");
            console.log(error);
        }
    });
}

// Chat
var SocketIOFileUpload = require('socketio-file-upload');

var io = require('socket.io')(server);
io.listen(server);

const Chat = io.of('/Chat');

var socketList = [];
///////////////////////////////////////
// Make an instance of SocketIOFileUpload and listen on this socket:
var G_uploader = new SocketIOFileUpload();
G_uploader.dir = root + "/static_assets";
var fixMoreSend = {
    name: '',
    mtime: null

};

Chat.on('connection', (socket) => {
    console.log('socket.id:', socket.id);
    socketList.push(socket);
    console.log('socketList:', socketList.length);

    let uploader = G_uploader;
    uploader.listen(socket);
    socket.on('disconnect', function() {
        console.log('disconnect', socket.id);
        uploader._onDisconnect;
    });
    // Do something when a file is saved:
    uploader.on("saved", function(event) {
        // console.log('type n:', event.file);
        // console.log("saved");
        //fix
        if (event.file.name != fixMoreSend.name || event.file.mtime != fixMoreSend.mtime) {
            fixMoreSend = {
                name: event.file.name,
                mtime: event.file.mtime

            }
            console.log('type n:', socket.id);
            console.log('type n:', event.file.name);

            // Pic
            if (event.file.name.match(/.svg/) ||
                event.file.name.match(/.png/) ||
                event.file.name.match(/.bmp/)
            ) {

                // Chat.emit('inputImage', { Image: event.file.name });
                var datas = {
                    user: "",
                    text: "",
                    image: event.file.name,
                    Video: {
                        name: "",
                        play: false
                    }
                }
                sendUserMessage(datas);
            }
            // Video
            if (event.file.name.match(/.mp4/)) {

                // Chat.emit('inputImage', { Image: event.file.name });
                var datas = {
                    user: "",
                    text: "",
                    image: '',
                    Video: {
                        name: event.file.name,
                        play: false
                    }
                }
                if (datas != fixMoreSend) {

                    fixMoreSend = datas;

                    // sendUserMessage(datas);
                }
            }
        }
    });

    // Error handler:
    uploader.on("error", function(event) {
        console.log("Error from uploader", event);
    });
    ///////////////////////////////////////

    time.CL("user Login" + socket.id);
    socket.on('message', (data) => {
        sendUserMessage(data);
    });
});


function sendUserMessage(data) {
    console.log("Send:", data);
    Chat.emit('inputMessage', {
        user: data.user || "",
        text: data.text || "",
        image: data.image || "",
        Video: {
            name: "MoMIdent.mp4", //MoMIdent.mp4
            play: false
        }
    });
}


// uploadEditor
var G_uploader2 = new SocketIOFileUpload();
G_uploader2.dir = root + "/static_assets";
const uploadEditor = io.of('/uploadEditor');

uploadEditor.on('connection', (socket) => {

    let uploader = G_uploader2;
    uploader.listen(socket);
    uploader.on("saved", function(event) {
        console.log(' uploadEditor type n:', event.file.name);
        // Pic
        // if (event.file.name.match(/.svg/) ||
        // event.file.name.match(/.png/) ||
        // event.file.name.match(/.bmp/)
        //             ) {

        //                 Chat.emit('inputImage', { Image: event.file.name });
        //                 var datas = {
        //                     user: "",
        //                     text: "",
        //                     image: event.file.name,
        //                     Video: {
        //                         name: "",
        //                         play: false
        //                     }
        //                 }
        //                 sendUserMessage(datas);
        //             }
        //             // Video
        //             if (event.file.name.match(/.mp4/)) {

        //                 Chat.emit('inputImage', { Image: event.file.name });
        //                 var datas = {
        //                     user: "",
        //                     text: "",
        //                     image: '',
        //                     Video: {
        //                         name: event.file.name,
        //                         play: false
        //                     }
        //                 }
        //                 sendUserMessage(datas);
        //             }
    });

    // Error handler:
    uploader.on("error", function(event) {
        console.log("Error from uploader", event);
    });
});