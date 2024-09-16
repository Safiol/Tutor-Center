const express = require("express");
const studentRoutes = require("./src/routes/student.routes");
const tutorRoutes = require("./src/routes/tutor.routes");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./src/database/db");

//socket for queue
const http = require("http");
const { initSocket } = require("./src/utils/socket");

dotenv.config({ path: "./.env" });
const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = initSocket(server);

const setupServer = async (test) => {
    app.use(express.json());
    app.use(cors());
    app.use("/student", studentRoutes(io));
    app.use("/tutor", tutorRoutes(io));
    const socketPort = process.env.SOCKET_PORT || 3001;
    app.listen(port, () => {
        if (test === 0) {
            console.log(`Express app is running on port ${port}`);
        }
    });
    server.listen(socketPort, () => {
        if (test === 0) {
            console.log(`WebSocket server is running on port ${socketPort}`);
        }
    });
};

//for doing console log, not important
if (process.env.NODE_ENV === "test") {
    setupServer(1);
} else {
    setupServer(0);
}

//exports mainly for tests
module.exports = { app, setupServer, io };
