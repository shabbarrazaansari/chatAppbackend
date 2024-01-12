const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv =require('dotenv')
dotenv.config();
const app = express();
const port = 8081;

const adminRoutes = require('./routes/adminroutes');
const signUp = require('./routes/signuproutes');
const sequelize = require('./util/database')



app.use(cors());
app.use(bodyParser.json({extended:true}));

app.use(adminRoutes)

app.use(signUp);

sequelize
// .sync({force:true})
 .sync()
.then(result=>{
    
  app.listen(port,()=>{
    console.log('hello i am ',`${port}`)
   })

})
