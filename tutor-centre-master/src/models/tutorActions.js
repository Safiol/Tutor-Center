import serverAPI from "./ServerAPI";

const removeUserFromQueue = async (user, index) => {
    try {
        const res = await serverAPI.tutorRemoveUser(user, index);
        if (res && res.data) {
            // Check if res is defined before accessing res.data
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
};

const alertNextPersonInQueue = async () => {
    try {
        const res = await serverAPI.tutorAlertNextPerson();
        if (res && res.data) {
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
};

const getQueue = async () => {
    try {
        const res = await serverAPI.tutorGetQueueData();
        if (res && res.data) {
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export { removeUserFromQueue, alertNextPersonInQueue, getQueue };
