import { Link } from "react-router-dom";

export default function ErrorPage() {
    const style = {
        margin: "0 auto",
        textAlign: "center",
    }
    return (
        <div style={style}>
            {/* The error may not be 404, however IDK if we can get the status code unless using data router */}
            <h1>Error 404: Page Not Found</h1>
            <br />
            The page you were looking for doesn't exist. Check your URL for proper spelling or go back and try again.
            <br />
            Or click here to go <Link className="Link" to="/">Home</Link>.
        </div>
    );
}
