import { useState } from "react";
import { loginUser } from "../Services/userService.js";

export default function Login() {
    const [user, setUser] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(null);
    const [inputs, setInputs] = useState({
        searchinput: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleMouseOver = () => {
        if (!inputs.searchinput || !inputs.password) {
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
            } else {
                setUser(null);
                setError(res.message);
            }
        } catch (err) {
            console.log("server error", err);
        } finally {
            setLoading(false);
            setDisabled(false);
        }
    };
    return (
        <div className="min-h-screen w-screen flex justify-center items-center bg-gray-100">
            <form
                className="shadow-lg px-5 py-3 w-[270px]"
                onSubmit={handleSubmit}
            >
                {error && (
                    <div className="text-red-500 text-center text-sm mb-3">
                        {error}
                    </div>
                )}
                <div>
                    <div>
                        <label htmlFor="searchinput" className="font-semibold">
                            Username or Email:
                        </label>
                    </div>
                    <input
                        type="text"
                        name="searchinput"
                        id="searchinput"
                        onChange={handleChange}
                        className="w-full border-gray-400 shadow-md rounded-md outline-none p-[5px] indent-2"
                        required
                    />
                </div>
                <div>
                    <div>
                        <label htmlFor="password" className="font-semibold">
                            Password:
                        </label>
                    </div>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        className="w-full border-gray-400 shadow-md rounded-md outline-none p-[5px] indent-2"
                        required
                    />
                </div>
                <div className="text-center m-2">
                    <button
                        type="submit"
                        onMouseOver={handleMouseOver}
                        disabled={disabled}
                        className="rounded-md bg-violet-400 font-semibold px-6 py-[5px] mt-2 disabled:cursor-not-allowed"
                    >
                        {loading ? "Loading" : "Login"}
                    </button>
                </div>
                <div className="text-sm text-blue-500">
                    Don't have an account? Register here
                </div>
            </form>
        </div>
    );
}
