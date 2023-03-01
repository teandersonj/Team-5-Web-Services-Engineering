import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../providers/UserProvider';

/**
 * Here we alert the user to verify their email and then redirect them to the login page.
 * But for our purposes, we'll just redirect them to the login page when they click the button.
 * @param {*} props
 * @returns <FinishRegistration />
 */
export default function FinishRegistration(props) {
    // Check if the user's logged in and redirect them if they are
    const { user } = useContext(UserContext);
    useEffect(() => {
        if (user.loggedIn) {
            navigate('/');
        }
    }, []);


    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    };

    return (
        <>
            <div className="flexDirectionColumn">
                <h1 className="pageHeading centerText">Registration Complete</h1>
                <p>Account Created. We have sent a verification email to the email you provided.
                    <br /><em>For now this is just a dummy page.</em>
                </p>
                <button className="alignSelfCenter roundedBlue" onClick={handleClick}>Continue</button>
            </div>
        </>
    )
}
