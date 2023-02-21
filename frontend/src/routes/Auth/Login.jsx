import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Logo from '../../components/images/Logo.png';
import LabeledInput from '../../components/LabeledInput';

export default function Login(props) {
    const [formState, setFormState] = useState({
        usernameEmail: "",
        password: "",
        errors: {}
    });

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormState((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Logging in example");
        return false;
    };

    return (
        <>
        <main>
            <h1>Fireside Gaming</h1>
            <img src={Logo} alt="Fireside Gaming Logo" />
            <h2>Login</h2>
            <form id="loginForm" action="#" method="post" onSubmit={handleSubmit}>
                <LabeledInput id="usernameEmail" label="Username / Email" placeholder="Enter email or username here" type="text" onChange={handleInputChange} />
                <LabeledInput id="password" label="Password" placeholder="Enter password here" type="password" onChange={handleInputChange} />
                <div>
                    <label>
                        <input type="checkbox" />
                        Remember me
                    </label>
                </div>
                <div>Forgot your password? Click <Link className="Link" to="/forgot-password">here</Link> to reset your password.</div>
                <div>Don't have an account? <Link className="Link" to="/register">Register Now</Link></div>
                <div className="centerContent">
                    <input type="submit" className="roundedBlue" value="Login" />
                </div>
                <div className="flexButtonsEitherSide">
                    <button disabled>Login with Discord</button>
                    <button disabled>Login with Steam</button>
                </div>
            </form>
        </main>

        {/* TODO: This is for debugging only */ }
        <div style={{ maxWidth: "300px", wordWrap: 'break-word' }}>
            <h3>Current State: </h3>
            <code>
                {JSON.stringify(formState)}
            </code>
        </div>
    </>
    )
};
