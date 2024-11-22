
const Button = ({
    children,
    type = "button",
    className ='',
    bgcolor = "bg-color-600",
    textcolor = "text-white",
    ...props
}) => {

    return (
        <button
        type = { type }
        className= {` px-4 py-2 rounded-lg ${textcolor} ${bgcolor} ${className}`} {...props}
        >{children}</button>
    );
}

export default Button