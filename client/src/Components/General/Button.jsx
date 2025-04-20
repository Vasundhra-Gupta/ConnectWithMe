export default function Button({
    type,
    BtnText,
    className = "",
    disabled,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            disabled={disabled}
            className={`bg-blue-500  hover:bg-blue-400 rounded-md font-semibold px-4 py-1 overflow-hidden disabled:cursor-not-allowed ${className}`}
        >
            {BtnText}
        </button>
    );
}
