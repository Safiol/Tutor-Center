import { render, fireEvent } from "@testing-library/react-native";
import Homescreen from "../views/screens/Homescreen";

jest.mock("../models/ServerAPI", () => ({
    handleButtonPressTest: jest.fn(),
}));

describe("Homescreen", () => {
    it("renders the header and buttons", () => {
        const { getByText } = render(<Homescreen />);
        // expect(getByText("Hello World")).toBeTruthy();
        // expect(getByText("GET /test/")).toBeTruthy();
        expect(getByText("Go to TutorView Temp")).toBeTruthy();
    });

    it("handles button press events", async () => {
        expect.assertions(1);
        const navigation = { navigate: jest.fn() };
        const { getByText } = render(<Homescreen navigation={navigation} />);
        const tutorViewButton = getByText("Go to TutorView Temp");

        fireEvent.press(tutorViewButton);
        expect(navigation.navigate).toHaveBeenCalledWith("Tutor");
    });
});
