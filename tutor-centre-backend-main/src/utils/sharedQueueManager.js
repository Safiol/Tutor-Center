const Queue = require("../model/Queue");
const QueueManager = require("../utils/queueManager");

const tutorQueue = new Queue();
const queueManager = new QueueManager(tutorQueue, null);

module.exports = queueManager;
