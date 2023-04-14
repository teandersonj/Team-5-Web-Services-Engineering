import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserContext } from '../../providers/UserProvider';
import axios from 'axios';
import validateElement from '../../services/Validation';
import LabeledInput from '../../components/LabeledInput';
import ValidationErrorList from '../../components/ValidationErrorList';

/**
 * This component is used to register a new user.
 * @param {*} props
 * @returns {JSX.Element} <Register />
 **/
export default function Register(props) {
    // TODO: We need to have a way the user to move back and forth through the form "steps" preserving state
    const navigate = useNavigate();
    // We can get the location state passed in from the "previous page"; here it should be the Continue Registration page
    // We can use this to pre-populate the form with the user's first name and email
    // const oldData = useLocation();
    const { user, updateUser } = useContext(UserContext);

    // On page refresh or initial load, check if the user's already logged in
    useEffect(() => {
        if (user.loggedIn) {
            navigate("/profile");
        }
    });

    const getInitialState = () => ({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password2: "",
        passwordStrength: 0,
        playstyle: "",
        disabled: false,
        errors: {},
        player: {
            AvatarName: "Unset",
            Playstyle: "Unset",
            Attitude: "Unset",
            CompositeSkillLevel: 0.0,
        }
    });

    // Define initial state. Ideally we'd define this in a function and just call it here so we can
    // return to the initial state on resets or something
    const [formState, setFormState] = useState(getInitialState());

    // We can use useEffect here to check the password strength and update the state
    // It'll be called whenever the password changes and trigger re-rendering
    useEffect(() => {
        let val = 0;
        // Bail and reset if it's empty
        if (!formState.password) {
            setFormState((prev) => ({ ...prev, passwordStrength: 0 }));
            return;
        }

        if (formState.password.length === 0) {
            setFormState((prev) => ({ ...prev, passwordStrength: 0 }));
            return;
        }

        // TODO: Determine the proper strength requirements
        // Check alpha characters
        if (formState.password.match(/[a-z]/i)) {
            val += 1;
        }
        // Check uppercase characters
        if (formState.password.match(/[A-Z]/i)) {
            val += 1;
        }
        // Check numbers
        if (formState.password.match(/[0-9]/i)) {
            val += 1;
        }
        // Check special characters
        if (formState.password.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/i)) {
            val += 1;
        }
        // Check length
        if (formState.password.length >= 8) {
            val += 1;
        }
        // Determine the strength
        if (val === 5) {
            val = 100;
        } else {
            val = val * 20;
        }

        setFormState((prev) => ({ ...prev, passwordStrength: val }));
    }, [formState.password]);

    const handleInputChange = (event) => {
        // Perform validation on the input
        validateOnChange(event.target);

        // Update the state with the new value
        setFormState((prev) => ({ ...prev, [event.target.id]: event.target.value }));
    };

    const validateOnChange = (element) => {
        // Check if validating password2, if so we need to pass the password value as well to match it against
        const validationResult = element.id === "password2" ? validateElement(element, null, { value: `^${formState.password}$`, message: "Password and Confirm Password must match" }) : validateElement(element);
        // Check if there were new errors
        if (Object.keys(validationResult).length > 0) {
            // We can associate the result of the validation function with the input's id
            // so we'll have an object like errors: { [inputId]: { [validationRule]: "Validation error message" } }
            // Have to keep track of the previous errors so we don't overwrite them later
            const errors = { ...formState.errors, [element.id]: validationResult };

            // Now we begin to update our state here with the new errors,
            // keeping hold of the previous state (including other inputs' errors)
            setFormState((prev) => ({ ...prev, errors }));
        } else {
            // If there were no returned errors from the validation function,
            // we know the input is valid, so we can remove its key from the errors object
            const newErrors = { ...formState.errors };
            delete newErrors[element.id];

            // And update the state with that input's errors removed
            setFormState((prev) => ({ ...prev, errors: newErrors }));
        }
    };

    // TODO: Disable the submit button if there are any errors in the formState.errors object
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Disable the form while we're processing to prevent double submissions
        setFormState((prev) => ({ ...prev, disabled: true }));

        // Ensure there are no validation errors
        if (Object.keys(formState.errors).length > 0) {
            toast.error("Check your inputs and try again");
            setFormState((prev) => ({ ...prev, disabled: false }));
            return false;
        }

        // Attempt to send the info to server
        await axios.post("/api/register/", formState).then(async (res) => {
            if (process.env.NODE_ENV === "development") {
                console.log("/register response: " + res);
            }
            if (res.status !== 201) {
                throw new Error({ status: res.status, data: res.data || res });
            }
            const { data } = res;
            const newUser = {
                id: data.id,
                username: data.username,
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
            };
            return newUser;
        }).then(async (newUser) => {
            // With the account created on the backend, we need to get and store the JWT token
            // so we can authenticate with the backend in Continue Registration
            await axios.post("/api/token/", {
                username: formState.username,
                password: formState.password,
            }).then((res) => {
                if (process.env.NODE_ENV === "development") {
                    console.log("/token response: " + res);
                }
                if (res.status !== 200) {
                    throw new Error({ status: res.status, data: res.data || res });
                }
                const { data } = res;
                newUser.accessToken = data.access;
                newUser.refreshToken = data.refresh;
                updateUser(newUser);
                return navigate("/register/continue");
            }).catch((err) => {
                throw new Error({ status: err.status, data: err.data || err });
            });
        }).catch((err) => {
            if (process.env.NODE_ENV === "development") {
                console.log(err.status + " " + (err?.data || err));
            }
            toast.error("Registration failed. Please try again.");
            // This'll contain any errors from the server as [fieldName]: "Error message"
            // We can update our errors object with the new errors
            const errs = {};
            for (const [key, value] of Object.entries(err.response.data)) {
                // Check if the response contains keys from the formState because these will represent the errors related to the fields with the same name
                if (formState.hasOwnProperty(key)) {
                    // We can associate the result of the validation function with the input's id
                    // so we'll have an object like errors: { [inputId]: { [validationRule]: "Validation error message" } }
                    // Have to keep track of the previous errors so we don't overwrite them later
                    errs[key] = value;
                }
            }
            // Now we begin to update our state here with the new errors,
            // keeping hold of the previous state (including other inputs' errors)
            // Re-enable the form
            setFormState((prev) => ({ ...prev, errors: errs, disabled: false }));
            return;
        });
    };

    return (
        <>
            <h1 className="pageHeading">Registration</h1>
            <p>Already have an account? <Link className="Link" style={{ textDecoration: "underline" }} to="/login">Go to Login</Link></p>
            <form id="registerForm" aria-labelledby="Registration Form" action="#" method="POST" onSubmit={handleSubmit}>
                <div className="formRow flexDirectionRow justifyContentSpaceBetween">
                    <button disabled>Login with Discord</button>
                    <button disabled>Login with Steam</button>
                </div>
                <fieldset style={{ border: 0 }} disabled={!!formState.disabled}>
                    {formState.errors.username && <ValidationErrorList errors={formState.errors.username} />}
                    <LabeledInput id="username" label="Username" placeholder="Enter username here" type="text" onChange={handleInputChange} orientation="vertical" containerClassName="formRow" required />
                    {formState.errors.first_name && <ValidationErrorList errors={formState.errors.first_name} />}
                    <LabeledInput id="first_name" label="First Name" type="text" defaultValue={formState.first_name} placeholder="Enter your first name here" onChange={handleInputChange} containerClassName="width-100 formRow" required />
                    {formState.errors.last_name && <ValidationErrorList errors={formState.errors.last_name} />}
                    <LabeledInput id="last_name" label="Last Name" type="text" defaultValue={formState.last_name} placeholder="Enter your last name here" onChange={handleInputChange} containerClassName="width-100 formRow" required />
                    {formState.errors.email && <ValidationErrorList errors={formState.errors.email} />}
                    <LabeledInput id="email" label="Email Address" type="email" defaultValue={formState.email} placeholder="Enter your email here" onChange={handleInputChange} containerClassName="width-100 formRow" required />
                    <div className="formRow">
                        <div className="flexDirectionColumn width-100">
                            <label>Password Strength</label>
                            <progress className="width-100" value={formState.passwordStrength} max="100"></progress>
                        </div>
                    </div>
                    {formState.errors.password && <ValidationErrorList errors={formState.errors.password} />}
                    <LabeledInput id="password" label="Password" type="password" defaultValue={formState.password} placeholder="Enter your password here" onChange={handleInputChange} containerClassName="width-100 formRow" required />
                    {formState.errors.password2 && <ValidationErrorList errors={formState.errors.password2} />}
                    <LabeledInput id="password2" label="Confirm Password" type="password" defaultValue={formState.passwordConfirm} placeholder="Enter your password again here" onChange={handleInputChange} containerClassName="width-100 formRow" required />
                    <p className="flexDirectionRow justifyContentSpaceBetween">
                        <button id="submit" form="registerForm" type="submit" className="roundedBlueBtn" disabled={formState.disabled}>Continue</button>
                        <button className="roundedGrayBtn"><Link className="Link" style={{ color: "white" }} to="/">Cancel</Link></button>
                    </p>
                </fieldset>
            </form>
        </>
    );
};
