const { app, setupServer } = require("../../../index.js");
const supertest = require("supertest");
const request = supertest(app);

// students
describe("Student Queue Controller", () => {
    test("Joining the queue returns the correct message and estimated wait time", async () => {
        const response = await request.post("/student/joinQueue").send({ user: "John Doe" });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("User joined the queue.");
        expect(response.body.estimatedWaitTime).toBeDefined();
    });

    test("Leaving the queue returns the correct message and user", async () => {
        await request.post("/student/joinQueue").send({ user: "John Doe" });

        const response = await request.post("/student/leaveQueue").send({ user: "John Doe" });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("User left the queue.");
        expect(response.body.user).toBeDefined();
    });

    test("Getting estimated wait time returns the correct message and estimated wait time", async () => {
        const response = await request.get("/student/estimatedWaitTime");

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Estimated wait time fetched.");
        expect(response.body.estimatedWaitTime).toBeDefined();
    });
});

describe("Tutor Queue Controller", () => {
    const user = { user: "John Doe", session_ID: "example_session_id_1" };
    const user2 = { user: "Al D", session_ID: "example_session_id_2" };

    test("Removing a user from the queue", async () => {
        await request.post("/student/joinQueue").send(user);

        const response = await request.post("/tutor/removeUser").send(user);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("User removed from the queue.");
        expect(response.body.user).toBeDefined();
    });

    test("Alerting the next person in the queue", async () => {
        await request.post("/student/joinQueue").send(user);
        await request.post("/student/joinQueue").send(user2);

        const response = await request.post("/tutor/alertNextPerson");

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Next person in the queue has been alerted and dequeued.");
        expect(response.body.user).toBeDefined();
    });

    test("Fetching the estimated wait time", async () => {
        const response = await request.get("/tutor/estimatedWaitTime");

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Estimated wait time fetched.");
        expect(response.body.estimatedWaitTime).toBeDefined();
    });
});
