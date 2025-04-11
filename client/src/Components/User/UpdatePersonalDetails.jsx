import Button from "../General/Button";
import { useUserContext } from "../../Context/UserContext";
import { useState } from "react";
import { updatePersonalDetails } from "../../Services/userService";
import { useNavigate } from "react-router-dom";

export default function UpdatePersonalDetails() {
    const { user } = useUserContext();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        firstName: user?.user_firstName,
        lastName: user?.user_lastName,
        email: user?.user_email,
        password: "",
    });
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleMouseOver = () => {
        if (
            inputs.firstName === user.user_firstName &&
            inputs.email === user.user_email
        ) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setDisabled(true);
            const res = await updatePersonalDetails(inputs);
            if (
                res &&
                res.message === "personal details updated successfully"
            ) {
                setMessage(res.message);
            } else {
                setInputs(null);
            }
        } catch (err) {
            console.log("server error", err);
            navigate("/error");
        } finally {
            setLoading(false);
            setDisabled(false);
        }
    };

    const inputFields = [
        {
            type: "text",
            placeholder: "Enter first name",
            id: "firstName",
            name: "firstName",
            defaultValue: `${inputs?.firstName}`,
            label: "First Name",
            required: true,
        },
        {
            type: "text",
            placeholder: "Enter last name",
            id: "lastName",
            name: "lastName",
            defaultValue: `${inputs?.lastName}`,
            label: "Last Name",
            required: true,
        },
        {
            type: "email",
            placeholder: "Enter email",
            id: "email",
            defaultValue: `${inputs?.email}`,

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
        <div key={field.name} className="my-4">
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
                    defaultValue={field.defaultValue}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 bg-white"
                />
            </div>
        </div>
    ));

    return (
        <form className="w-[600px] p-10" onSubmit={handleSubmit}>
            {message}
            {inputElements}
            <Button
                type={"submit"}
                disabled={disabled}
                onMouseOver={handleMouseOver}
                BtnText={loading ? "loading" : "Update"}
            />
        </form>
    );
}
