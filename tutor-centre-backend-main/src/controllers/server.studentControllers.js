const queueManager = require("../utils/sharedQueueManager");
const { makeSessionID } = require("../utils/sessionIDMaker");
const insertData  = require("../database/dbQueryFunctions");
//const insertData = require("../database/db");

const joinQueue = (io) => async (req, res) => {
    const session_ID = makeSessionID(10);
    const { studentId, studentClass, problemSummary } = req.body;
    const userInfo = {
        studentId,
        studentClass,
        problemSummary,
        session_ID,
    };
    //try{
        insertData.insertData(userInfo.session_ID, userInfo.problemSummary, userInfo.studentClass);
    // } catch {
    //     console.log("error");
    // };
    
    const position = queueManager.joinTutorQueue(userInfo);
    const estimatedWaitTime = queueManager.getEstimatedWaitTime();
    console.log(userInfo);
    io.emit("queue_updated", { estimatedWaitTime: estimatedWaitTime });

    res.status(200).json({ message: "User joined the queue.", estimatedWaitTime, position, user: userInfo });
};

const leaveQueue = (io) => async (req, res) => {
    const { position } = req.body;
    const userRemoved = queueManager.removeAtIndex(position);
    const size = queueManager.size();

    const estimatedWaitTime = queueManager.getEstimatedWaitTime();
    // io.emit("queue_updated", { estimatedWaitTime: estimatedWaitTime, size });
    io.emit("user_left", { position });
    res.status(200).json({ message: "User left the queue.", user: userRemoved });
};

const getEstimatedWaitTime = async (req, res) => {
    const estimatedWaitTime = queueManager.getEstimatedWaitTime();
    const size = queueManager.size();
    // console.log(`server.studentController getting estimated wait time: ${estimatedWaitTime}`);
    res.status(200).json({ message: "Estimated wait time fetched.", estimatedWaitTime, size });
};

module.exports = {
    joinQueue,
    leaveQueue,
    getEstimatedWaitTime,
};
