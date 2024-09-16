const express = require("express");
const router = express.Router();
const tutorController = require("../controllers/server.tutorControllers");

//all have /tutor/ infront

const tutorRoutes = (io) => {
    router.post("/removeUser", tutorController.removeUser(io));
    router.post("/alertNextPerson", tutorController.alertNextPerson(io));
    // router.post("/dequeueNextPerson", tutorController.dequeueNextPerson);
    router.get("/estimatedWaitTime", tutorController.getEstimatedWaitTime);
    router.post("/getQueue", tutorController.getQueue(io));
    return router;
};

module.exports = tutorRoutes;
