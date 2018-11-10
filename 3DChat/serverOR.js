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


app.get('/', function(request, response) {
    // time.CL('requst is  ' + request);
    response.sendFile(path.resolve(__dirname, root, 'index.html'));
});



app.get('/CHAT', function(request, response) {
    // time.CL('requst is  ' + request);
    response.sendFile(path.resolve(__dirname, root, 'index.html'));
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
// var SocketIOFileUpload = require('socketio-file-upload');

var io = require('socket.io')(server);
io.listen(server);

const Chat = io.of('/Chat');

// var socketList = [];
///////////////////////////////////////
// Make an instance of SocketIOFileUpload and listen on this socket:
// var G_uploader = new SocketIOFileUpload();
// G_uploader.dir = root + "/static_assets";
var fixMoreSend = {
    name: '',
    mtime: null

};

Chat.on('connection', (socket) => {
    console.log('socket.id:', socket.id);
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
        Video: data.Video || ""
    });
}