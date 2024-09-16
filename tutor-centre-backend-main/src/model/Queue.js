const QueueInterface = require("./I_Queue");
class Queue extends QueueInterface {
    constructor() {
        super();
        this.items = [];
    }

    enqueue(item) {
        return this.items.push(item);
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift();
    }

    front() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    removeAtIndex(index) {
        console.log(index);

        if (this.isEmpty() || index < 0 || index >= this.size()) {
            return null;
        }
        return this.items.splice(index, 1)[0];
    }

    remove(item) {
        const index = this.items.findIndex((queueItem) => queueItem === item);
        // console.log(item, index);

        if (index !== -1) {
            this.items.splice(index, 1);
            return item;
        }
        return null;
    }

    alertNextPerson() {
        if (!this.isEmpty()) {
            const nextPerson = this.front();
            //logic for 5 min alert here
        }
    }
}

module.exports = Queue;
