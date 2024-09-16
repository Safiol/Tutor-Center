import React, { useEffect } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import TutorView from "./src/views/screens/TutorView";
import Homescreen from "./src/views/screens/Homescreen";
import StudentView from "./src/views/screens/StudentView";
import JoinTheQueue from "./src/views/screens/JoinTheQueue";
import ScheduleAppointment from "./src/views/screens/ScheduleAnAppointment";
import AboutTutors from "./src/views/screens/AboutTutors";
import TutorCalendar from "./src/views/screens/TutorCalendar";
import { SocketProvider } from "./src/context/socketContext";

const switchNavigator = createSwitchNavigator(
    {
        notSignedInFlow: createStackNavigator(
            {
                Home: Homescreen,
            },
            { initialRouteName: "Home" }
        ),
        studentFlow: createStackNavigator(
            {
                Student: StudentView,
                JoinTheQueue: JoinTheQueue,
                ScheduleAppointment: ScheduleAppointment,
                AboutTutors: AboutTutors,
            },
            { initialRouteName: "Student" }
        ),
        tutorFlow: createStackNavigator(
            {
                Tutor: TutorView,
                TutorCalendar: TutorCalendar,
            },
            { initialRouteName: "Tutor" }
        ),
    },
    {
        initialRouteName: "notSignedInFlow",
    }
);

const App = createAppContainer(switchNavigator);

export default () => {
    // const handleQueueUpdated = (data) => {
    //     // Handle the updated Queue data here
    //     console.log("Queue updated:", data);
    // };

    // useSocket(handleQueueUpdated);

    return (
        <SocketProvider>
            <App />
        </SocketProvider>
    );
};
