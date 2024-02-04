const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv =require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
dotenv.config();
const app = express();
const path = require('path');
const server = http.createServer(app);
const io = socketIo(server,{cors:{origin:'*'}});
const port = 8081;

const adminRoutes = require('./routes/adminroutes');
const signUp = require('./routes/signuproutes');
const messageText = require('./routes/messagebox');
const group = require('./routes/group');
const groupMsg = require('./routes/groupMessage');
const sequelize = require('./util/database')


const User = require('./models/signup')
const Message = require('./models/message');
const UserGroup = require('./models/usergroup');
const Group = require('./models/group');

const groupWithName = require('./models/nameandgroup');

User.belongsToMany(Group, { through: UserGroup, foreignKey: 'userId' });
Group.belongsToMany(User, { through: UserGroup, foreignKey: 'groupId' });

Group.hasMany(groupWithName);
groupWithName.belongsTo(Group);


User.hasMany(Message);
Message.belongsTo(User);

Group.hasMany(Message);
Message.belongsTo(Group);
app.use(express.static('public'));



app.use(cors());
app.use(bodyParser.json({extended:true}));
io.on('connection',(socket)=>{
  console.log('a user connected');
  socket.on('message',(msg)=>{
    io.emit('message',msg);
    console.log("socket message",msg);
  });
  socket.on('group chat',(groupmsg)=>{
    io.emit('group chat',groupmsg)
    console.log('group chat>>>',groupmsg)
  })
  socket.on('disconnect',()=>{
    console.log('user disconnect');

  });
})

app.use(adminRoutes)

app.use(signUp);

app.use(messageText);
app.use(group);
app.use(groupMsg)


sequelize
// .sync({force:true})
 .sync()
.then(result=>{
    
  server.listen(port,()=>{
    console.log('hello i am ',`${port}`)
   })

})
