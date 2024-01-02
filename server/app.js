const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const router = require('./routes/index')
const app = express()
const { WebSocket, WebSocketServer } = require('ws');
const http = require('http');
const { uuid } = require('uuidv4');

app.use(morgan('dev', {
    skip: function (req, res) { return res.statusCode < 400 }
}))
app.use('/images', express.static('images'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api', router);
app.use('/t', require('./routes/redirect.route'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || config.get('port')

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true

        });
        const server = http.createServer(app);
        const wsServer = new WebSocketServer({ server });

// A new client connection request received

        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
        // I'm maintaining all active connections in this object
        const clients = {};
// I'm maintaining all active users in this object
        const users = {};
// The current editor content is maintained here.
        let editorContent = null;
// User activity history.
        let userActivity = [];

// Event types
        const typesDef = {
            USER_EVENT: 'userevent',
            CONTENT_CHANGE: 'contentchange'
        }

        function broadcastMessage(json) {
            // We are sending the current data to all connected clients
            const data = JSON.stringify(json);
            for(let userId in clients) {
                let client = clients[userId];
                if(client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            };
        }

        function handleMessage(message, userId) {
            const dataFromClient = JSON.parse(message.toString());
            const json = { type: dataFromClient.type };
            if (dataFromClient.type === typesDef.USER_EVENT) {
                users[userId] = dataFromClient;
                userActivity.push(`${dataFromClient.username} joined to edit the document`);
                json.data = { users, userActivity };
            } else if (dataFromClient.type === typesDef.CONTENT_CHANGE) {
                editorContent = dataFromClient.content;
                json.data = { editorContent, userActivity };
            }
            broadcastMessage(json);
        }

        function handleDisconnect(userId) {
            console.log(`${userId} disconnected.`);
            const json = { type: typesDef.USER_EVENT };
            const username = users[userId]?.username || userId;
            userActivity.push(`${username} left the document`);
            json.data = { users, userActivity };
            delete clients[userId];
            delete users[userId];
            broadcastMessage(json);
        }

// A new client connection request received
        wsServer.on('connection', function(connection) {
            // Generate a unique code for every user
            const userId = uuid();
            console.log('Recieved a new connection');

            // Store the new connection and handle messages
            clients[userId] = connection;
            console.log(`${userId} connected.`);
            connection.on('message', (message) => handleMessage(message, userId));
            // User disconnected
            connection.on('close', () => handleDisconnect(userId));
        });
        // I'm maintaining all active connections in this object
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()