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
    response.sendFile(path.resolve(__dirname, root, '3D.html'));
});

app.post('/EDITOR', function(request, response) {
    console.log('request', request.body["UserName"]);
    console.log('request', request.body['password']);
    // console.log('response', response.UserName);
    response.sendFile(path.resolve(__dirname, root, 'index.html'));

});


// app.post('/CHAT', function(req, res) {

//     if (!req.files)
//         return res.status(400).send('No files were uploaded.');

//     // console.log(req.files);
//     // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
//     // console.log(req.files.sampleFile[0]);
//     let index = 0;
//     console.log(req.files.sampleFile);
//     if (typeof req.files.sampleFile != "undefined") {

//         if (Array.isArray(req.files.sampleFile)) {

//             req.files.sampleFile.forEach(element => {
//                 index++;
//                 // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//                 createFile(element, index);



//                 // let sampleFile = req.files.sampleFile[0];

//                 // console.log(sampleFile);
//                 // Use the mv() method to place the file somewhere on your server
//             });
//         } else {
//             createFile(req.files.sampleFile, 666);
//         }
//     }
//     res.sendFile(path.resolve(__dirname, root, 'index.html'));
// });



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

var fixMoreSend = {
    name: '',
    mtime: null

};
var fixMoreSend2 = {
    name: '',
    mtime: null

};
Chat.on('connection', (socket) => {
    // socket.use((packet, next) => {
    //     console.log(packet);
    //     console.log(next);
    //     console.log(packet.doge);
    //     if (packet.doge === true) {
    //         console.log("doge is true");
    //         return next();
    //     } else {
    //         console.log("doge is false");
    //         next(new Error('Not a doge error'));
    //     }
    // });
    ///////////////////////////////////////
    // Make an instance of SocketIOFileUpload and listen on this socket:
    var G_uploader = new SocketIOFileUpload();
    G_uploader.dir = root + "/static_assets";

    socket.on('One', (data) => {
        socket.emit('Two', { msg: 'Two' });
    });
    console.log('socket.id connection:', socket.id);
    socketList.push(socket);
    // console.log('socketList:', socketList.length);

    let uploader = G_uploader;
    uploader.listen(socket);


    uploader.on("start", function(event) {
        if (event.file.name != fixMoreSend.name || event.file.mtime != fixMoreSend.mtime) {
            fixMoreSend = {
                name: event.file.name,
                mtime: event.file.mtime
            }
            console.log(event.file);
            if (/\.exe$/.test(event.file.name)) {
                // uploader.abort(event.file.id, socket);
            }
            if (/\.svg$/.test(event.file.name) ||
                /\.png$/.test(event.file.name) ||
                /\.bmp$/.test(event.file.name) ||
                /\.mp4$/.test(event.file.name) ||
                /\.jpg$/.test(event.file.name)
            ) {
                console.log("will Save: ", event.file.name);
                return;
            } else {
                // uploader.abort(socket.id, socket);
            }
        } else {
            // uploader.abort(socket.id, socket);
        }
    });

    uploader.uploadValidator = function(event, callback) {
        // asynchronous operations allowed here; when done,
        if (/\.svg$/.test(event.file.name) ||
            /\.png$/.test(event.file.name) ||
            /\.bmp$/.test(event.file.name) ||
            /\.mp4$/.test(event.file.name) ||
            /\.jpg$/.test(event.file.name)
        ) {
            time.CL('uploadValidator data  IO:' + event.file.name);
            callback(true);
        } else {
            time.CL('uploadValidator data not IO:' + event.file.name);
            callback(false);
        }
    };

    socket.on('disconnect', function() {
        console.log('socket.id disconnect', socket.id);
        // uploader._onDisconnect;
    });
    // Do something when a file is saved:
    uploader.on("saved", function(event) {
        if (event.file.name != fixMoreSend2.name || event.file.mtime != fixMoreSend2.mtime) {
            fixMoreSend2 = {
                name: event.file.name,
                mtime: event.file.mtime
            }
            event.file.clientDetail.newName = event.file.base + getLastName(event.file.name);

            console.log('type n:', event.file.name);
            console.log("saved");
        }
    });

    // Error handler:
    uploader.on("error", function(event) {
        console.log("Error from uploader 1234", event);
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
        type: data.type || "text",
        avatar: data.avatar || "",
        user: data.user || "",
        text: data.text || "",
        image: data.image || "",
        VideoName: data.VideoName || "", //MoMIdent.mp4
        play: false
    });
}


const uploadEditor = io.of('/uploadEditor');

uploadEditor.on('connection', (socket) => {
    // uploadEditor
    var uploader = new SocketIOFileUpload();
    uploader.dir = root + "/static_assets";


    uploader.listen(socket);
    uploader.uploadValidator = function(event, callback) {
        // asynchronous operations allowed here; when done,
        if (/\.svg$/.test(event.file.name) ||
            /\.png$/.test(event.file.name) ||
            /\.bmp$/.test(event.file.name) ||
            /\.jpg$/.test(event.file.name)
        ) {
            time.CL('uploadValidator data  IO:' + event.file.name);
            callback(true);
        } else {
            time.CL('uploadValidator data not IO:' + event.file.name);
            callback(false);
        }
    };
    uploader.on("start", function(event) {
        // event.file.name += "awd";
        if (/\.svg$/.test(event.file.name) ||
            /\.png$/.test(event.file.name) ||
            /\.bmp$/.test(event.file.name) ||
            /\.jpg$/.test(event.file.name)
        ) {
            return;
        } else {
            uploader.abort(event.file.id, socket);
        }
    });
    uploader.on("saved", function(event) {
        event.file.clientDetail.newName = event.file.base + getLastName(event.file.name);
        console.log(' uploadEditor type n:', event.file);
        // Pic
        // if (event.file.name.match(/.svg/) ||
        //     event.file.name.match(/.png/) ||
        //     event.file.name.match(/.bmp/)
        // ) {

        //     Chat.emit('inputImage', { Image: event.file.name });
        //     var datas = {
        //         type: data.type || "text",
        //         avatar: data.avatar || "",
        //         user: data.user || "",
        //         text: data.text || "",
        //         image: data.image || "drawing.svg",
        //         VideoName: "MoMIdent.mp4", //MoMIdent.mp4
        //         play: false
        //     }
        //     sendUserMessage(datas);
        // }
        // // Video
        // if (event.file.name.match(/.mp4/)) {

        //     Chat.emit('inputImage', { Image: event.file.name });
        //     var datas = {
        //         type: data.type || "text",
        //         avatar: data.avatar || "",
        //         user: data.user || "",
        //         text: data.text || "",
        //         image: data.image || "drawing.svg",
        //         VideoName: "MoMIdent.mp4", //MoMIdent.mp4
        //         play: false
        //     }
        //     sendUserMessage(datas);
        // }
    });

    // Error handler:
    uploader.on("error", function(event) {
        console.log("Error from uploader", event);
    });
});

function getLastName(name) {

    if (/\.svg$/.test(name)) return '.svg';
    if (/\.png$/.test(name)) return '.png';
    if (/\.bmp$/.test(name)) return '.bmp';
    if (/\.jpg$/.test(name)) return '.jpg';
    if (/\.mp4$/.test(name)) return '.mp4';
}