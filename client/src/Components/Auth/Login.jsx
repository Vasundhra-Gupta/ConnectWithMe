import { useState } from "react";
import { loginUser } from "../../Services/authService.js";
import { Link, useNavigate } from "react-router-dom";
import Button from "../General/Button.jsx";
import { useUserContext } from "../Context/UserContext.jsx";
import { verify } from "../../utils/errorHandling.js";

export default function Login() {
    const { setUser } = useUserContext();
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState({
        searchInput: "",
        password: "",
        root: "",
    });
    const [inputs, setInputs] = useState({
        searchInput: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleMouseOver = () => {
        if (
            !inputs.searchInput ||
            !inputs.password ||
            Object.entries(error).some(([_, err]) => err)
        ) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            setDisabled(true);
            setError(null);
            const res = await loginUser(inputs);
            if (res && !res.message) {
                setUser(res);
                navigate("/");
            } else {
                setUser(null);
                setError((prev) => ({ ...prev, root: res.message }));
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
            name: "searchInput",
            id: "searchInput",
            required: true,
            label: "Username",
            placeholder: "Enter your username",
        },
        {
            type: "password",
            name: "password",
            id: "password",
            required: true,
            label: "Password",
            placeholder: "Create a password",
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
                className="w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {error?.[field.name] && (
                <div className="text-red-600 ml-1 text-xs mt-1">
                    {error[field.name]}
                </div>
            )}
        </div>
    ));

    return (
        <div className="flex justify-center items-center ">
            <form className="shadow-lg px-5 py-3" onSubmit={handleSubmit}>
                {error?.root && (
                    <div className="text-red-500 text-center text-sm mb-3">
                        {error.root}
                    </div>
                )}
                {inputElements}

                <div className="text-center m-2">
                    <Button
                        type="submit"
                        className={`w-full transition-all  text-white`}
                        BtnText={loading ? "Loading" : "Login"}
                        disabled={disabled}
                        onMouseOver={handleMouseOver}
                    ></Button>
                </div>
                <div className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <Link
                        to={"/register"}
                        className="text-blue-500 font-medium hover:underline"
                    >
                        Register here
                    </Link>
                </div>
            </form>
        </div>
    );
}
