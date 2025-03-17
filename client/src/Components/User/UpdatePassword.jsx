import Button from "../General/Button";

export default function UpdatePassword() {
    const handleChange = async () => {};
    const handleSubmit = async () => {};
    const inputFields = [
        {
            type: "password",
            placeholder: "Old Password",
            id: "password",
            name: "password",
            label: "Old Password",
            required: true,
        },
        {
            type: "password",
            placeholder: "New Password",
            id: "newPassword",
            name: "newPassword",
            label: "New Password",
            required: true,
        },
        {
            type: "password",
            placeholder: "Confirm New Password",
            id: "confirmPassword",
            name: "confirmPassword",
            label: "Confirm Password",
            required: true,
        },
    ];
    const inputElements = inputFields.map((field) => (
        <div key={field.name} className="mb-4">
            {/* Label */}
            <label
                htmlFor={field.name}
                className="block text-gray-700 font-medium mb-1"
            >
                {field.label}
            </label>

            {/* Input Field */}
            <div className="relative">
                <input
                    type={field.type}
                    name={field.name}
                    id={field.id}
                    placeholder={field.placeholder}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 bg-white"
                />
            </div>
        </div>
    ));

    return (
        <form className="w-[600px] p-10" onSubmit={handleSubmit}>
            {inputElements}
            <Button type={"submit"} BtnText={"Update Password"} />
        </form>
    );
}
