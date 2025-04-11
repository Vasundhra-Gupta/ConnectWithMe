import { useState } from "react";
import { updatePassword } from "../../Services/userService";
import Button from "../General/Button";
import { useNavigate } from "react-router-dom";

export default function UpdatePassword() {
    // const {user} = useUserContext();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleMouseOver = () => {
        if (!inputs.oldPassword || !inputs.newPassword) {
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
            const res = await updatePassword(inputs);
            if (res && res.message === "password updated successfully") {
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
            type: "password",
            placeholder: "Old Password",
            id: "oldPassword",
            name: "oldPassword",
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
