const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const userRoute = require('./routes/users');
const User = require('./models/user');
const ForgotRequest = require('./models/Forgot');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const logStream = fs.createWriteStream(path.join(__dirname, 'server.log'), {flags:'a'});

app.use(helmet());
app.use(cors());
app.use(morgan('combined', {stream: logStream}));

app.use(bodyParser.json({extended:false}));
app.use(bodyParser.urlencoded({extended:false}));
app.use('/users', userRoute);
app.use((req,res,next)=>{
    res.send('<h1>Backend Running :)</h1>');
})

User.hasMany(ForgotRequest);
ForgotRequest.belongsTo(User);

sequelize.sync().then(res=>{
    app.listen(4000);
})
.catch(err=>{
    console.log(err);
})
