class QueueManager {
    tutorQueue;
    emailNotificaion;
    averageTutorSessionDuration;

    constructor(queue, emailNotificationSystem) {
        this.emailNotificiation = emailNotificationSystem;
        this.tutorQueue = queue;
        this.averageTutorSessionDuration = 15; //or change this later when expanded
    }
    joinTutorQueue(user) {
        return this.tutorQueue.enqueue(user);
    }

    dequeueNextPerson() {
        return this.tutorQueue.dequeue();
    }

    getEstimatedWaitTime() {
        return this.calculateWaitTime(this.averageTutorSessionDuration);
    }

    getQueueList() {
        return this.tutorQueue;
    }

    size() {
        return this.tutorQueue.size();
    }

    calculateWaitTime() {
        const queueSize = this.tutorQueue.size();
        // console.log(queueSize);
        const estimatedWaitTime = queueSize * this.averageTutorSessionDuration;
        // console.log(`estimatedWaitTime: ${estimatedWaitTime}`);
        return estimatedWaitTime;
    }

    removeUser(user) {
        return this.tutorQueue.remove(user);
    }

    removeAtIndex(index) {
        return this.tutorQueue.removeAtIndex(index);
    }

    async alertNextPerson() {
        if (!this.tutorQueue.isEmpty()) {
            const nextPerson = this.tutorQueue.front();
            const email = nextPerson.email;
            await this.emailNotificaion.sendAlert(email); //find out how to get emails

            //logic for a 5-minute alert here for future implimentation.

            console.log(`Alerting ${nextPerson}: Your turn is coming up in 5 minutes.`);
        } else {
            console.log("The queue is empty.");
        }
    }
}

module.exports = QueueManager;
