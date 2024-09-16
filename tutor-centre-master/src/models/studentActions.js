import serverAPI from "./ServerAPI";

const joinQueue = async (user, setQueuePosition, setHasJoined, studentClass, problemSummary) => {
    if (studentClass && problemSummary) {
        let res = await serverAPI.studentJoinQueue(user.studentId, studentClass, problemSummary);
        console.log(res.data.position);
        if (res.data.position) {
            setQueuePosition(res.data.position);
            setHasJoined(true);
        }
    } else {
        alert("Please fill out both fields before joining the queue.");
    }
};

const leaveQueue = async (user, handleDoneBeingHelped) => {
    let position = user.position;
    position--;
    console.log(`position sending: ${position}`);
    let res = await serverAPI.studentLeaveQueue(null, position);
    console.log(res.data);
    handleDoneBeingHelped();
};

export { joinQueue, leaveQueue };
