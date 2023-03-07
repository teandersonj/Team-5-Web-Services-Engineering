// Disable these linting rules since we want to access the DOM directly
/* eslint testing-library/no-node-access: 0 */
/* eslint testing-library/no-container: 0 */

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LabeledInput from "../components/LabeledInput";

describe('LabeledInput Component Tests', () => {
    // Use Jest and react-testing-library functions to test the component
    // First, does it render without any props?
    // Nex, given various props, does it alter the rendered output as expected?
    // Finally, does it call the correct function when the input is changed?
    // Test rendering without props
    it('Renders without props', () => {
        const { container } = render(<LabeledInput />);
        expect(container).toMatchSnapshot();
    });

    it("Renders with certain props (Labeled Email Required Input with Attributes)", () => {
        const { container } = render(<LabeledInput id="email" label="Email" type="email" defaultValue="test@test.com" disabled={true} required={true} orientation="horizontal" placeholder="Enter your email" />);
        expect(container).toMatchSnapshot();
        // Make sure the input has the correct properties 4
        const input = container.querySelector("input");
        expect(input).toHaveAttribute("id", "email");
        expect(input).toHaveAttribute("name", "email");
        expect(input).toHaveAttribute("type", "email");
        // defaultValue gets converted to value in the DOMdf
        expect(input).toHaveAttribute("value", "test@test.com");
        expect(input).toHaveAttribute("placeholder", "Enter your email");
        expect(input).toHaveAttribute("disabled");
        expect(input).toHaveAttribute("required");
    });

    it("Renders with certain props (Labeled Password Optional Input with Attributes)", () => {
        const { container } = render(<LabeledInput id="password" label="Password" type="password" defaultValue="password" disabled={false} required={false} orientation="vertical" placeholder="Enter your password" />);
        expect(container).toMatchSnapshot();
        // Make sure the input has the correct properties
        const input = container.querySelector("input");
        expect(input).toHaveAttribute("id", "password");
        expect(input).toHaveAttribute("name", "password");
        expect(input).toHaveAttribute("type", "password");
        // defaultValue gets converted to value in the DOM
        expect(input).toHaveAttribute("value", "password");
        expect(input).toHaveAttribute("placeholder", "Enter your password");
        expect(input).not.toHaveAttribute("disabled");
        expect(input).not.toHaveAttribute("required");
    });

    // Let's pass a dummy function and see if it gets called when the input is changed
    it("Calls the correct function when the input is changed", async () => {
        const user = userEvent.setup();
        const mockOnChange = jest.fn();
        const { container } = render(<LabeledInput id="email" label="Email" type="email" defaultValue="" disabled={false} required={false} orientation="vertical" placeholder="Enter your email" onChange={(event) => { mockOnChange(event.target.value) }} />);
        const input = container.querySelector("input");
        // Simulate typing into the input
        await user.type(input, "T");
        // Make sure the function was called the appropriate number of times
        expect(mockOnChange).toHaveBeenCalledTimes(1);
        // Make sure the function was called with the correct arguments
        expect(mockOnChange).toHaveBeenCalledWith("T");
    });
});
