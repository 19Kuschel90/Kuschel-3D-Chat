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
const port = 3000;
app.use(express.static(root));
app.set('port', process.env.PORT || port); // z.B: PORT=9000 npm start
var server = app.listen(process.env.PORT || port);
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


var SocketIOFileUpload = require('socketio-file-upload');

var io = require('socket.io')(server);
io.listen(server);

const Chat = io.of('/Chat');

var userList = {

}

Chat.on('connection', (socket) => {
    ///////////////////////////////////////
    // Make an instance of SocketIOFileUpload and listen on this socket:
    var uploader = new SocketIOFileUpload();
    uploader.dir = root + "/uploadimg";
    uploader.listen(socket);

    // Do something when a file is saved:
    uploader.on("saved", function(event) {
        console.log(event.file);
    });

    // Error handler:
    uploader.on("error", function(event) {
        console.log("Error from uploader", event);
    });
    ///////////////////////////////////////

    time.CL("user Login" + socket.id);
    socket.on('message', (data) => {
        console.log('message', data.message);
        Chat.emit('inputMessage', { message: data.message });
    });
});