import { useState } from "react";
import { registerUser } from "../../Services/userService.js";
import { Link, useNavigate } from "react-router-dom";
import Button from "../General/Button.jsx";
import { useUserContext } from "../../Context/UserContext.jsx";

export default function Register() {
    const { setUser } = useUserContext();
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
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
            ) ||
            error
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
                setError(res.message);
            }
        } catch (err) {
            console.log("server error", err.message);
        } finally {
            setLoading(false);
            setDisabled(false);
        }
    };

    const inputFields = [
        {
            type: "text",
            name: "userName",
            id: "userName",
            required: true,
            label: "Username",
        },
        {
            type: "text",
            name: "firstName",
            id: "firstName",
            required: true,
            label: "First Name",
        },
        {
            type: "text",
            name: "lastName",
            id: "lastName",
            label: "Last Name",
        },
        {
            type: "email",
            name: "email",
            id: "email",
            required: true,
            label: "Email",
        },
        {
            type: "password",
            name: "password",
            id: "password",
            required: true,
            label: "Password",
        },
        {
            type: "text",
            name: "contact",
            id: "contact",
            required: true,
            label: "Contact",
        },
    ];

    const inputElements = inputFields.map((field) => (
        <div key={field.name}>
            <div>
                <label htmlFor={field.name}>{field.label}</label>
            </div>
            <div>
                <input
                    type={field.type}
                    name={field.name}
                    id={field.id}
                    required={field.required}
                    onChange={handleChange}
                    className="w-full border-gray-400 shadow-md rounded-md outline-none p-[5px] indent-2"
                />
            </div>
        </div>
    ));

    const fileFields = [
        {
            type: "file",
            name: "avatar",
            id: "avatar",
            required: true,
            label: "Avatar",
        },
        {
            type: "file",
            name: "coverImage",
            id: "coverImage",
            label: "Cover Image",
        },
    ];
    const fileElements = fileFields.map((field) => (
        <div key={field.name}>
            <div>
                <label htmlFor={field.name}>{field.label}</label>
            </div>
            <div>
                <input
                    type={field.type}
                    name={field.name}
                    id={field.id}
                    required={field.required}
                    onChange={handleFileChange}
                    className="w-full border-gray-400 shadow-md rounded-md outline-none p-[5px] indent-2"
                />
            </div>
        </div>
    ));

    return (
        <div className="min-h-screen w-screen flex justify-center items-center">
            <form
                className="shadow-lg px-6 py-3 w-[270px]"
                onSubmit={handleSubmit}
            >
                {error && (
                    <div className="text-red-500 text-center text-sm mb-3">
                        {error}
                    </div>
                )}
                {inputElements}
                {fileElements}
                <div className="text-center m-2">
                    <Button
                        type="submit"
                        onMouseOver={handleMouseOver}
                        disabled={disabled}
                        className=" bg-violet-400"
                        BtnText={loading ? "Loading" : "Register"}
                    ></Button>
                </div>
                <div className="text-sm">
                    Already have an account?{" "}
                    <Link to={"/login"} className="text-blue-500">
                        Login here
                    </Link>
                </div>
            </form>
        </div>
    );
}
