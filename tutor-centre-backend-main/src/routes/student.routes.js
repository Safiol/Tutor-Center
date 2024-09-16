const express = require("express");
const router = express.Router();
const studentController = require("../controllers/server.studentControllers");

const { test } = require("../controllers/server.controllers");

const studentRoutes = (io) => {
    //all have /student/ infront
    router.use("/test/", test);
    router.post("/joinQueue", studentController.joinQueue(io));
    router.post("/leaveQueue", studentController.leaveQueue(io));
    router.get("/estimatedWaitTime", studentController.getEstimatedWaitTime);

    return router;
};

module.exports = studentRoutes;
