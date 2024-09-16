import axios from "axios";
import { LOCAL_HOST } from "@env";

class ServerAPI {
    api;
    constructor() {
        this.api = axios.create({
            baseURL: `http://${LOCAL_HOST}:3000`,
            timeout: 10000,
        });
    }

    async handleButtonPressTest() {
        let res = await this.api.get("student/test/");
        if (res.data) {
            console.log(res.data);
        }
        return res;
    }

    async getQueueWaittime() {
        try {
            let res = await this.api.get("student/estimatedWaitTime/");
            if (res.data) {
                console.log(res.data);
                return res.data.estimatedWaitTime;
            }
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    async studentJoinQueue(studentId, studentClass, problemSummary) {
        try {
            let res = await this.api.post("student/joinQueue/", { studentId, studentClass, problemSummary });
            if (res.data) {
                console.log(res.data);
            }
            return res;
        } catch (error) {
            console.log(error);
        }
    }
    async studentLeaveQueue(studentId, position) {
        try {
            let res = await this.api.post("student/leaveQueue/", { studentId, position });
            if (res.data) {
                console.log(res.data);
            }
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    async tutorRemoveUser(user, index) {
        try {
            let res = await this.api.post("tutor/removeUser/", { user: user, index: index });
            if (res.data) {
                console.log(res.data);
            }
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    async tutorAlertNextPerson() {
        try {
            let res = await this.api.post("tutor/alertNextPerson/");
            if (res.data) {
                // console.log(res.data);
            }
            return res;
        } catch (error) {
            console.log(error.stack);
        }
    }

    async tutorGetQueueData() {
        try {
            let res = await this.api.post("tutor/getQueue/");
            if (res.data) {
                console.log(res.data);
            }
            return res;
        } catch (error) {
            console.log(error.stack);
        }
    }
}

const serverAPI = new ServerAPI();
export default serverAPI;
