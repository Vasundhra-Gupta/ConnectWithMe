import { useState } from "react";
import { loginUser } from "../../Services/authService.js";
import { Link, useNavigate } from "react-router-dom";
import Button from "../General/Button.jsx";
import { useUserContext } from "../../Context/UserContext.jsx";

export default function Login() {
    const { setUser } = useUserContext();
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(null);
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
        if (!inputs.searchInput || !inputs.password) {
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
                setError(res.message);
            }
        } catch (err) {
            console.log("server error", err);
            navigate("/error");
        } finally {
            setLoading(false);
            setDisabled(false);
        }
    };

    return (
        <div className="flex justify-center items-center">
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
                        <label htmlFor="searchInput" className="font-semibold">
                            Username or Email:
                        </label>
                    </div>
                    <input
                        type="text"
                        name="searchInput"
                        id="searchInput"
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
                    <Button
                        type="submit"
                        className="bg-violet-400"
                        BtnText={loading ? "Loading" : "Login"}
                        disabled={disabled}
                        onMouseOver={handleMouseOver}
                    ></Button>
                </div>
                <div className="text-sm">
                    Don't have an account?{" "}
                    <Link to={"/register"} className="text-blue-500">
                        Register here
                    </Link>
                </div>
            </form>
        </div>
    );
}
