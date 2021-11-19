require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
   cors: {
     origin: "*",
     methods: ["GET", "POST"],
     allowedHeaders: ["*"],
     credentials: true
   }
 });
var cors = require('cors');
const dal = require('./dal');
const tokenUtility = require('./dal/token-utility');
const multer = require('multer')
const upload = multer();

var mimeDb = require('mime-db');
var mimeDictionary;
function guessMime(fileName) {
    if (!mimeDictionary) {
        mimeDictionary = {};
        for (var everyType in mimeDb) {
            let everyExtension = mimeDb[everyType];
            if (everyExtension.extensions) {
                for (var extension in everyExtension.extensions) {
                    mimeDictionary[everyExtension.extensions[extension]] = everyType;
                }
            }
        }
    }
    try {
        return mimeDictionary[fileName.split('.').pop()];
    } catch (err) {
        console.log("Error guessing mime", fileName);
        return 'text/plain'
    }
}

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function (req, res) {
   res.sendFile('index.html', { root: __dirname });
});

app.post('/token', async function (req, res) {
   if (req.params.grant_type === 'refresh'){
      //TODO
   } else {
      const user =   {
         id:req.body.id,
         password:req.body.password
      }
      let tokens;
      try {
         tokens = await dal.validateUser(user)
      } catch (err){
         res.status(400).send({
            error:{message:'Invalid credentials', fields:{'id': 'Invalid credentials', 'password': 'Invalid credentials'}}
          });
         return;
      }
      res.status(200).send(tokens);
   }
});

app.post('/user', async function (req, res) {
   if (!req.body.id){
      res.status(400).send({
         message: "Content can not be empty!"
       });
      return;
   }
   const user =   {
      id:req.body.id,
      password:req.body.password
   }
   let tokens;
   try {
      tokens = await dal.createUser(user)
   } catch (err){
      res.status(400).send({
         error:{message:'Duplicate user', fields:{'id': 'Duplicate user'}}
       });
      return;
   }
   res.status(200).send(tokens)
});

app.post('/room', async function (req, res) {
   console.log('posting to room')
   let validated = tokenUtility.validateToken(req)
   if (validated) {
      const room = {
         invitedUser:req.body.invitedUser,
         currentUser:validated.sub
      }
      let tokens;
      try {
         tokens = await dal.createRoom(room)
      } catch (err){
         console.log('err', err)
         res.status(400).send({
            error:{message:'Unable to create room', fields:{'room': 'Unable to create room'}}
          });
         return;
      }
      res.status(200).send(tokens);
   }
});
app.get('/room', async function (req, res) {
   let validated = tokenUtility.validateToken(req)
   if (validated) {
      let currentUser=validated.sub
      let tokens;
      try {
         tokens = await dal.getRoom(currentUser)
      } catch (err){
         console.log('err', err)
         res.status(400).send({
            error:{message:'Unable to get room', fields:{'room': 'Unable to get room'}}
          });
         return;
      }
      res.status(200).send(tokens);
   }
});

app.post('/upload', upload.single('file'), async function (req, res){
   console.log('upload API')
   let validated = tokenUtility.validateToken(req)
   if (validated) {
      let file;
      try {
         file = await dal.uploadFile(req)
         /*io.on('room', (socket)=>{
            socket.on('room', (message)=>{
               console.log('emitting the url')
               io.to(message.roomId).emit('room', {'roomId':'bob.aaa'})
            })
         })*/
         console.log('emitting req.body', req.body)
         io.to(req.body.roomId).emit('room', {event:'uploadedFile', fileId:req.body.name})
      } catch (err){
         console.log('err', err)
         res.status(400).send({
            error:{message:'Unable to upload file', fields:{'file': 'Unable to upload file'}}
          });
         return;
      }
      res.status(200).send(file);
   }
})

app.get('/file', async function (req, res) {
   let validated = tokenUtility.validateToken(req)
   let currentUser=validated.sub
   if (validated) {
      let file;
      try {
         file = await dal.getFile(req.query.roomId, req.query.fileId, currentUser)
         console.log('AAAfile', file)
      } catch (err){
         console.log('err', err)
         res.status(400).send({
            error:{message:'Unable to get file', fields:{'file': 'Unable to get file'}}
          });
         return;
      }
      res.set('Content-Type', guessMime(req.query.fileId));
      res.status(200).send(file);
   }
});

//roomId and fileName
//DAL does the join beteen roomId and currentUser or invitedUser present in the token

io.on('connection', (socket) =>{
    console.log(`connected to client ${socket.id}`);
    socket.on('room', (message)=>{
       console.log('message', message);
       if (message.event=='joinRoom'){
         socket.join(message.roomId);
       }
    });
 });

//getFile => prolly just get specific file and it'll get autodownloaded or something idk
server.listen(3001, function () {
 console.log('server listening at localhost:3001');
});