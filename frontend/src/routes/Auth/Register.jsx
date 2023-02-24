import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LabeledInput from '../../components/LabeledInput';

export default function Register(props) {
    // Define initial state. Ideally we'd define this in a function and just call it here so we can
    // return to the initial state on resets or something

    // TODO: We need to have a way the user to move back and forth through the form "steps" preserving state
    const [formState, setFormState] = useState({
        fName: "",
        lName: "",
        email: "",
        password: "",
        confirmPassword: "",
        passwordStrength: 0,
        playstyleSelect: "",
        errors: {}
    });

    const handleInputChange = (event) => {
        // Get the id and value of the input that triggered the event from within LabeledInput
        const { id, value } = event.target;
        // Update the state with the new value
        setFormState((prev) => ({ ...prev, [id]: value }));
    };

    // We can use useEffect here to check the password strength and update the state
    // It'll be called whenever the password changes and trigger re-rendering
    useEffect(() => {
        let val = formState.passwordStrength ?? 0;

        // Bail and reset if it's empty
        if (formState.password.length === 0) {
            setFormState((prev) => ({ ...prev, passwordStrength: 0 }));
            return;
        }

        // TODO: What's the criteria for a strong password?
        // The following is just a placeholder and logic isn't quite right
        if (formState.password.length > 8) {
            val += 10;
            if (formState.password.match(/[A-Z]/)) {
                val += 15;
            }
            if (formState.password.match(/[a-z]/)) {
                val += 15;
            }
            if (formState.password.match(/[0-9]/)) {
                val += 15;
            }
            if (formState.password.match(/[^A-Za-z0-9\\]/)) {
                val += 15;
            }
        }

        setFormState((prev) => ({ ...prev, passwordStrength: val }));
    }, [formState.password]);


    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Submit clicked");
    };

    // We can customize the appearance of the containers holding the text-like inputs
    const containerStyles = {
        width: "100%"
    };

    return (
        <>
            <h1 className="pageHeading">Registration</h1>
            <p>Already have an account? <Link className="Link" style={{ textDecoration: "underline" }} to="/login">Go to Login</Link></p>
            <form id="registerForm" aria-labelledby="Registration Form" action="#" method="POST" onSubmit={handleSubmit}>
                <div className="formRow flexButtonsEitherSide">
                    <button disabled>Login with Discord</button>
                    <button disabled>Login with Steam</button>
                </div>
                <div className="validationErrors">
                    {/* If we have errors, output them in a list */}
                    {formState.errors && <ul>{Object.keys(formState.errors).map((key) => (<li><div key={key}>{formState.errors[key]}</div></li>))}</ul>}
                </div>

                {/* TODO: Work with LabeledInput to allow for specifying other attributes such as min/max length */}
                <div className="formRow">
                    <LabeledInput id="fName" label="First Name" type="text" defaultValue={formState.fName} placeholder="Enter your first name here" onChange={handleInputChange} containerStyle={containerStyles} />
                </div>
                <div className="formRow">
                    <LabeledInput id="lName" label="Last Name" type="text" defaultValue={formState.lName} placeholder="Enter your last name here" onChange={handleInputChange} containerStyle={containerStyles} />
                </div>
                <div className="formRow">
                    <LabeledInput id="email" label="Email Address" type="email" defaultValue={formState.email} placeholder="Enter your email here" onChange={handleInputChange} containerStyle={{ width: "100%"}}  />
                </div>
                <div className="formRow">
                    <div className="inputVertical width-100">
                        <label>Password Strength</label>
                        <progress className="width-100" value={formState.passwordStrength} max="100"></progress>
                    </div>
                </div>
                <div className="formRow">
                    <LabeledInput id="password" label="Password" type="password" defaultValue={formState.password} placeholder="Enter your password here" onChange={handleInputChange} containerStyle={containerStyles} />
                </div>
                <div className="formRow">
                    <LabeledInput id="confirmPassword" label="Confirm Password" type="password" defaultValue={formState.passwordConfirm} placeholder="Enter your password again here" onChange={handleInputChange} containerStyle={containerStyles} />
                </div>
                <div className="formRow inputVertical">
                    {/* TODO: Extract this since it'll be used elsewhere */}
                    <label htmlFor='playstyleSelect'>Playstyle Preference</label>
                    <select id="playstyleSelect" name="playstyleSelect" defaultValue={formState.playstyleSelect} onChange={handleInputChange}>
                        <option value="">Select a playstyle</option>
                        <option value="Casual">Casual</option>
                        <option value="Semi">Semi-Competitive</option>
                        <option value="Competitive">Competitive</option>
                    </select>
                </div>
                <p className="flexButtonsEitherSide">
                    {/* TODO: This could either move to Step 2 directly then send all collected data to server or send what we ahve to server, get a response and then go there */}
                    {/* TODO: I think we'll have to sent this all to server first to check for existing accts, then if its validated we come back to Step 2.
                        If the user quits and re-logs before doing Step 2 we can bring that up again */}
                    <button id="submit" type="submit" className="roundedBlue">Continue</button>
                    <button className="roundedGray"><Link className="Link" style={{ color: "white" }} to="/">Cancel</Link></button>
                </p>
            </form>

            {/* TODO: This is for debugging only */}
            <div style={{ maxWidth: "300px", wordWrap: 'break-word' }}>
                <h3>Current State: </h3>
                <code>
                    {JSON.stringify(formState)}
                </code>
            </div>
        </>
    );
};
