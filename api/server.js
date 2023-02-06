const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const userRoute = require('./routes/users');
const chatRoute = require('./routes/chats');
const User = require('./models/user');
const Chat = require('./models/Chat');
const Active = require('./models/Active');
const ForgotRequest = require('./models/Forgot');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const logStream = fs.createWriteStream(path.join(__dirname, 'server.log'), {flags:'a'});

app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
}));
app.use(morgan('combined', {stream: logStream}));

app.use(bodyParser.json({extended:false}));
app.use(bodyParser.urlencoded({extended:false}));
app.use('/users', userRoute);
app.use('/chats', chatRoute);
app.use((req,res,next)=>{
    res.send('<h1>Backend Running :)</h1>');
})

User.hasMany(ForgotRequest);
ForgotRequest.belongsTo(User);
User.hasMany(Active);
Active.belongsTo(User);
User.hasMany(Chat);
Chat.belongsTo(User);

sequelize.sync().then(res=>{
    app.listen(4000);
})
.catch(err=>{
    console.log(err);
})
