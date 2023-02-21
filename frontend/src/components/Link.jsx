/**
 * BrowserRouter Link Component with custom styling
 * @param {*} props 
 * @param {props.to} to - The path to navigate to
 * @param {props.showUnderline} showUnderline - Whether or not to show an underline on the link
 * @param {props.lightOrDark} lightOrDark - Whether or not to show the link in light or dark mode
 * @param {props.className} className - Any additional classes to add to the link
 * @param {props.children} children - The children of the link
 * @param {props.rest} rest - Any other props to pass to the link
 * @returns Styled <Link /> Component
 */
export default function Link(props) {
    const { to, showUnderline, lightOrDark, className, children, ...rest } = props;
    return (
        <Link to={to} className={`Link ${showUnderline ? 'Link--underline' : ''} ${lightOrDark ? `Link--${lightOrDark}` : ''} ${className ? className : ''}`} {...rest}>
            {children}
        </Link>
    )
};
