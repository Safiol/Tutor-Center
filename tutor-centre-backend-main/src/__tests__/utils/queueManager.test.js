// This only tests actual logic of QueueManager rather than endpoints
const Queue = require("../../model/Queue");
const QueueManager = require("../../utils/queueManager.js");

const tutorQueue = new Queue();
const emailNotificationSystem = {}; // Mock email notification system
const queueManager = new QueueManager(tutorQueue, emailNotificationSystem);

describe("Queue Manager", () => {
    test("Joining the queue increases the estimated wait time", () => {
        const initialEstimatedWaitTime = queueManager.getEstimatedWaitTime();
        queueManager.joinTutorQueue({ user: "John Doe" });
        const newEstimatedWaitTime = queueManager.getEstimatedWaitTime();
        expect(newEstimatedWaitTime).toBeGreaterThan(initialEstimatedWaitTime);
    });
    test("Leaving the queue decreases the estimated wait time", () => {
        queueManager.joinTutorQueue({ user: "John Doe" });
        const initialEstimatedWaitTime = queueManager.getEstimatedWaitTime();
        queueManager.dequeueNextPerson();
        const newEstimatedWaitTime = queueManager.getEstimatedWaitTime();
        expect(newEstimatedWaitTime).toBeLessThan(initialEstimatedWaitTime);
    });
    test("Removing a user from the queue", () => {
        const user1 = { user: "John Doe" };
        const user2 = { user: "Jane Smith" };
        const user3 = { user: "Alice Brown" };
        queueManager.joinTutorQueue(user1);
        queueManager.joinTutorQueue(user2);
        queueManager.joinTutorQueue(user3);
        expect(queueManager.tutorQueue.items).toContain(user2);
        const removedUser = queueManager.removeUser(user2);
        expect(removedUser).toEqual(user2);
        expect(queueManager.tutorQueue.items).not.toContain(user2);
    });
});
