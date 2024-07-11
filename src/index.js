require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');


let port = process.env.PORT;
let DB_URL = process.env.DB_URL;

const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})


mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,   
})
.then(() => console.log('DB connected successfully'))
.catch(err => console.log(err));


io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

app.listen(port, () => {
    console.log('Server listening to PORT', port)
})

