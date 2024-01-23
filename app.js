const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv =require('dotenv')
dotenv.config();
const app = express();
const port = 8081;

const adminRoutes = require('./routes/adminroutes');
const signUp = require('./routes/signuproutes');
const messageText = require('./routes/messagebox');
const sequelize = require('./util/database')
const User = require('./models/signup')
const Message = require('./models/message');
const UserGroup = require('./models/usergroup');
const Group = require('./models/group');

User.belongsToMany(Group,{through:UserGroup});
Group.belongsToMany(User,{through:UserGroup})

User.hasMany(Message);
Message.belongsTo(User);

Group.hasMany(Message);
Message.belongsTo(Group);



app.use(cors());
app.use(bodyParser.json({extended:true}));

app.use(adminRoutes)

app.use(signUp);

app.use(messageText);


sequelize
// .sync({force:true})
 .sync()
.then(result=>{
    
  app.listen(port,()=>{
    console.log('hello i am ',`${port}`)
   })

})
