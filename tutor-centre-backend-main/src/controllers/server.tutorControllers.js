const queueManager = require("../utils/sharedQueueManager");

const removeUser = (io) => async (req, res) => {
    // console.log(req.body);
    // let index = req.body;
    let index = req.body.index;
    const user = req.body.user;
    index = index - 1;
    console.log(user + "\n" + index);

    // user.index = index;
    const removedUser = queueManager.removeAtIndex(index);
    if (removedUser) {
        io.emit("tutor_remove_user", { user: removedUser });
        io.emit("user_left", { position: index });

        res.status(200).json({ message: "User removed from the queue.", user: removedUser });
    } else {
        res.status(404).json({ message: "User not found in the queue." });
    }
};

const alertNextPerson = (io) => async (req, res) => {
    // queueManager.alertNextPerson();
    try {
        // console.log(`alert`);
        const nextUser = queueManager.dequeueNextPerson();
        if (nextUser) {
            // console.log(`alert, nextuser: ${nextUser}`);
            io.emit("tutor_alert_next_person");
            const estimatedWaitTime = queueManager.getEstimatedWaitTime();
            const size = queueManager.size();

            io.emit("queue_updated", { estimatedWaitTime, size });
        } else {
            res.status(404).json({ message: "Error dequeueing." });
        }

        res.status(200).json({ message: "Next person in the queue has been alerted and dequeued.", user: nextUser });
    } catch (error) {
        console.log(error);
    }
};

const getQueue = (io) => async (req, res) => {
    // queueManager.alertNextPerson();
    try {
        // console.log(`alert`);
        const currentQueue = queueManager.getQueueList();
        if (currentQueue) {
            // console.log(`alert, nextuser: ${nextUser}`);
            // io.emit("tutor_alert_next_person");
            const estimatedWaitTime = queueManager.getEstimatedWaitTime();
            const size = queueManager.size();

            io.emit("queue_tutor_data", { currentQueue, estimatedWaitTime, size });
        } else {
            res.status(404).json({ message: "Error sending queue to tutor." });
        }

        res.status(200).json({ message: "Sent queue data to tutor", currentQueue: currentQueue });
    } catch (error) {
        console.log(error);
    }
};

const getEstimatedWaitTime = async (req, res) => {
    const estimatedWaitTime = queueManager.getEstimatedWaitTime();
    // console.log(`server.studentController getting estimated wait time: ${estimatedWaitTime}`);
    res.status(200).json({ message: "Estimated wait time fetched.", estimatedWaitTime });
};

module.exports = {
    removeUser,
    alertNextPerson,
    getEstimatedWaitTime,
    getQueue,
};
