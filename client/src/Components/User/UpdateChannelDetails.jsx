import { useState } from "react";
import Button from "../General/Button";
import { updateChannelDetails } from "../../Services/userService";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Context/UserContext";
import { verify } from "../../utils/errorHandling";

export default function UpdateChannelDetails() {
    const { user } = useUserContext();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        userName: user?.user_name,
        bio: user?.user_bio,
        password: "",
    });
    const [error, setError] = useState({
        userName: "",
        bio: "",
        password: "",
        root: "",
    });
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleMouseOver = () => {
        if (
            (inputs.bio === user.user_bio &&
                inputs.userName === user.user_name &&
                !inputs.password) ||
            Object.entries(error).some(([_, err]) => err)
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
            const res = await updateChannelDetails(inputs);
            if (res && res.message === "channel details updated successfully") {
                console.log(res.message);
                setMessage(res.message);
                // setInputs(prev=>({...prev, password:""}))
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

    const handleBlur = (e) => {
        const { name, value } = e.target;
        verify(name, value, setError);
    };

    const inputFields = [
        {
            type: "text",
            placeholder: "Enter username",
            id: "userName",
            name: "userName",
            label: "Username",
            defaultValue: `${inputs?.userName}`,
            required: true,
        },
        {
            type: "text",
            placeholder: "Enter channel bio",
            id: "bio",
            name: "bio",
            defaultValue: `${inputs?.bio}`,
            label: "Bio",
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
                    defaultValue={field.defaultValue}
                    placeholder={field.placeholder}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 bg-white"
                />
                {error?.[field.name] && (
                    <div className="text-red-600 ml-1 text-xs mt-1">
                        {error[field.name]}
                    </div>
                )}
            </div>
        </div>
    ));

    return (
        <form className="lg:w-[60%] p-10" onSubmit={handleSubmit}>
            <p className="mb-3 text-gray-700">{message}</p>
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
