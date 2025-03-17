import Button from "../General/Button";

export default function UpdatePersonalDetails() {
    const handleChange = async () => {};
    const handleSubmit = async () => {};
    const inputFields = [
        {
            type: "text",
            placeholder: "Enter first name",
            id: "firstName",
            name: "firstName",
            label: "First Name",
            required: true,
        },
        {
            type: "text",
            placeholder: "Enter last name",
            id: "lastName",
            name: "lastName",
            label: "Last Name",
            required: true,
        },
        {
            type: "email",
            placeholder: "Enter email",
            id: "email",
            name: "email",
            label: "Email",
            required: true,
        },
        {
            type: "password",
            placeholder: "Enter Password",
            id: "password",
            name: "password",
            label: "Password",
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
            <Button type={"submit"} BtnText={"Update"} />
        </form>
    );
}
