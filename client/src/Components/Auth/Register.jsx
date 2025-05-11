import { useState } from "react";
import { registerUser } from "../../Services/authService.js";
import { Link, useNavigate } from "react-router-dom";
import Button from "../General/Button.jsx";
import { useUserContext } from "../Context/UserContext.jsx";
import { verify } from "../../utils/errorHandling.js";
import { fileRestrictions } from "../../utils/fileRestrictions.js";

export default function Register() {
    const { setUser } = useUserContext();
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState({
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        coverImage: "",
        avatar: "",
        contact: "",
        root: "",
    });
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        coverImage: "",
        avatar: "",
        contact: "",
    });
    const allowedEmptyFields = ["lastName", "coverImage"];
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setInputs((prev) => ({
                ...prev,
                [name]: files[0],
            }));
        }
    };

    const handleMouseOver = () => {
        if (
            Object.entries(inputs).some(
                ([key, value]) => !value && !allowedEmptyFields.includes(key)
            )
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
            setError(null);
            const res = await registerUser(inputs);
            if (res && !res.message) {
                setUser(res);
                navigate("/");
            } else {
                setUser(null);
                setError((prev) => ({ ...prev, root: res.message }));
            }
        } catch (err) {
            console.log("server error", err.message);
        } finally {
            setLoading(false);
            setDisabled(false);
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        verify(name, value, setError);
    };

    const handleFileRestrictions = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        fileRestrictions(name, file, setError);
    };

    const inputFields = [
        {
            type: "text",
            name: "userName",
            id: "userName",
            required: true,
            label: "Username",
            placeholder: "Enter your username",
        },
        {
            type: "text",
            name: "firstName",
            id: "firstName",
            required: true,
            label: "First Name",
            placeholder: "Enter your first name",
        },
        {
            type: "text",
            name: "lastName",
            id: "lastName",
            label: "Last Name",
            placeholder: "Enter your last name (optional)",
        },
        {
            type: "email",
            name: "email",
            id: "email",
            required: true,
            label: "Email",
            placeholder: "Enter your email",
        },
        {
            type: "text",
            name: "contact",
            id: "contact",
            required: true,
            label: "Contact",
            placeholder: "Enter your phone number",
        },
        {
            type: "password",
            name: "password",
            id: "password",
            required: true,
            label: "Password",
            placeholder: "Create a password",
        },
        {
            type: "password",
            name: "confirmPassword",
            id: "confirmPassword",
            required: true,
            label: "Confirm Password",
            placeholder: "Re-enter your password",
        },
    ];

    const inputElements = inputFields.map((field) => (
        <div key={field.name} className="mb-4">
            <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                {field.label}
            </label>
            <input
                type={field.type}
                name={field.name}
                id={field.id}
                required={field.required}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={field.placeholder}
                className="w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            {field.name === "confirmPassword" && inputs.password && (
                <div
                    className={`text-xs mt-1 ${
                        inputs.password === inputs.confirmPassword
                            ? "text-green-600"
                            : "text-red-600"
                    }`}
                >
                    {inputs.password === inputs.confirmPassword
                        ? "Passwords match!"
                        : "Passwords do not match"}
                </div>
            )}
            {error?.[field.name] && (
                <div className="text-red-600 text-xs ml-1 mt-1">
                    {error[field.name]}
                </div>
            )}
        </div>
    ));

    const fileFields = [
        {
            type: "file",
            name: "avatar",
            id: "avatar",
            required: true,
            label: "Profile Picture",
            accept: "image/*",
        },
        {
            type: "file",
            name: "coverImage",
            id: "coverImage",
            label: "Cover Image (optional)",
            accept: "image/*",
        },
    ];

    const fileElements = fileFields.map((field) => (
        <div key={field.name} className="mb-4">
            <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                {field.label}
            </label>
            <div className="relative">
                <input
                    type={field.type}
                    name={field.name}
                    id={field.id}
                    required={field.required}
                    onBlur={handleFileRestrictions}
                    onChange={handleFileChange}
                    accept={field.accept}
                    className="w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0
                        file:text-sm file:font-semibold
                        file:bg-purple-50 file:text-purple-700
                        hover:file:bg-purple-100"
                />
            </div>
            {error?.[field.name] && (
                <div className="text-red-600 mt-1 text-xs">
                    {error[field.name]}
                </div>
            )}
        </div>
    ));

    return (
        <div className="absolute z-20 top-0 left-0 w-full min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-purple-700 mb-2">
                        Welcome!
                    </h1>
                    <p className="text-gray-600">
                        Create your account to get started
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8">
                    {error?.root && (
                        <div className="text-red-500 text-center text-sm mb-4 p-2 bg-red-50 rounded-lg">
                            {error.root}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {inputElements}
                        {fileElements}

                        <div className="pt-2">
                            <Button
                                type="submit"
                                onMouseOver={handleMouseOver}
                                disabled={disabled}
                                className={`w-full transition-all bg-purple-600 hover:bg-purple-700 text-white`}
                                BtnText={
                                    loading ? "Creating account..." : "Register"
                                }
                            />
                        </div>

                        <div className="text-center text-sm text-gray-600 mt-4">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-purple-600 font-medium hover:underline"
                            >
                                Log in here
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
