/* eslint testing-library/no-container: 0 */
/* eslint testing-library/no-node-access: 0 */

import { render } from "@testing-library/react";
import ValidationErrorList from "../components/ValidationErrorList";

describe("<ValidationErrorList /> Component", () => {
    it("Doesn't render without props/errors", () => {
        const { container } = render(<ValidationErrorList />);
        const validationErrorListElement = container.querySelector("ul");
        expect(validationErrorListElement).not.toBeInTheDocument();
    });

    it("Doesn't render with certain props (Empty Errors Object)", () => {
        const { container } = render(<ValidationErrorList errors={{}} />);
        const validationErrorListElement = container.querySelector("ul");
        expect(validationErrorListElement).not.toBeInTheDocument();
    });

    it("Renders with certain props (Errors Object with 1 Error)", () => {
        const { container } = render(<ValidationErrorList errors={{ email: "Email is required" }} />);
        const validationErrorListElement = container.querySelector("ul");
        expect(validationErrorListElement).toBeInTheDocument();
        const errorElement = container.querySelector("li");
        expect(errorElement).toBeInTheDocument();
        expect(errorElement).toHaveTextContent("Email is required");
    });

    it("Renders with certain props (Errors Object with 2 Errors)", () => {
        const { container } = render(<ValidationErrorList errors={{ email: "Email is required", password: "Password is required" }} />);
        const validationErrorListElement = container.querySelector("ul");
        expect(validationErrorListElement).toBeInTheDocument();
        const errorElements = container.querySelectorAll("li");
        expect(errorElements).toHaveLength(2);
        expect(errorElements[0]).toHaveTextContent("Email is required");
        expect(errorElements[1]).toHaveTextContent("Password is required");
    });
});
