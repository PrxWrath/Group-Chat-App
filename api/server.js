const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const userRoute = require('./routes/users');
const chatRoute = require('./routes/chats');
const inviteRoute = require('./routes/invites');
const adminRoute = require('./routes/admin');
const User = require('./models/user');
const Group = require('./models/Group');
const Invite = require('./models/Invites');
const GroupUser = require('./models/GroupUsers');
const Archive = require('./models/Archive');
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
app.use('/invites', inviteRoute);
app.use('/admin', adminRoute);
app.use((req,res,next)=>{
    res.send('<h1>Backend Running :)</h1>');
})

User.hasMany(ForgotRequest);
ForgotRequest.belongsTo(User);
User.hasMany(Active);
Active.belongsTo(User);
User.hasMany(Chat);
Chat.belongsTo(User);
Group.hasMany(Chat);
Chat.belongsTo(Group);
Group.hasMany(Active);
Active.belongsTo(Group);
Group.belongsToMany(User, {through: GroupUser});
User.belongsToMany(Group, {through: GroupUser});
User.hasMany(Invite);
Invite.belongsTo(User);
User.hasMany(Archive);
Archive.belongsTo(User);
Group.hasMany(Archive);
Archive.belongsTo(Group);

sequelize.sync().then(res=>{
    app.listen(4000);
})
.catch(err=>{
    console.log(err);
})
