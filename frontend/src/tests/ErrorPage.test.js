import { render } from "@testing-library/react";
import ErrorPage from "../routes/ErrorPage";

// Mock the Link component and Navigation functions from react-router-dom
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
    useHref: () => jest.fn(),
    Link: (props) => <a {...props} />,
}));

describe('<ErrorPage /> Route Tests', () => {
    it('Renders properly', () => {
        const { container } = render(<ErrorPage />);
        expect(container).toHaveTextContent("Page Not Found");
    });
});
