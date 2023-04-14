import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div className="flexDirectionColumn alignItemsCenter centerText">
            {/* The error may not be 404, however IDK if we can get the status code unless using data router */}
            <h1 className="pageHeading">Error 404: Page Not Found</h1>
            <p>The page you were looking for doesn't exist.<br /> Check your URL for proper spelling or go back and try again.</p>
            <span>Or return to <Link className="Link" to="/">Home</Link></span>
        </div>
    );
}
