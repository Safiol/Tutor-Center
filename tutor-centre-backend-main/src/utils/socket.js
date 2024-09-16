const { Server } = require("socket.io");
const queueManager = require("../utils/sharedQueueManager");

const initSocket = (server) => {
    const emitEstimatedWaitTime = (io) => {
        const estimatedWaitTime = queueManager.getEstimatedWaitTime();
        const size = queueManager.size();

        io.emit("queue_updated", { estimatedWaitTime, size });
    };
    const sendQueueData = (io) => {
        const queue = queueManager.getQueueList();

        io.emit("queue_tutor_data", { queue });
    };
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("A user connected");

        socket.on("queue_updated", (data) => {
            io.emit("queue_updated", data);
        });

        socket.on("tutor_remove_user", () => {
            emitEstimatedWaitTime(io);
        });

        socket.on("tutor_alert_next_person", () => {
            emitEstimatedWaitTime(io);
        });

        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });

        socket.on("queue_tutor_data", (data) => {
            io.emit("queue_tutor_data", data);
        });
    });
    setInterval(() => {
        emitEstimatedWaitTime(io);
        sendQueueData(io);
    }, 5000);
    return io;
};

module.exports = { initSocket };
