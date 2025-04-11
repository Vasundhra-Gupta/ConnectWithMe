import { useState } from "react";
import { deleteAccount } from "../../Services/userService";
import Button from "../General/Button";
import { useNavigate } from "react-router-dom";

export default function DeleteAccount() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const handleMouseOver = () => {
        if (!password) {
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
            const res = await deleteAccount(password);
            if (res && res.message === "account deleted successfully") {
                setMessage(res.message);
            } else {
                setPassword(null);
            }
        } catch (err) {
            console.log("server error", err);
            navigate("/error");
        } finally {
            setLoading(false);
            setDisabled(false);
            setTimeout(() => {
                navigate("/", { replace: true });
                window.location.reload();
            }, 300);
        }
    };

    return (
        <form className="p-10" onSubmit={handleSubmit}>
            {message}
            <div className="my-4">
                <label
                    htmlFor="password"
                    className="block text-gray-700 font-medium mb-1"
                >
                    Password
                </label>

                <div className="relative">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 bg-white"
                    />
                </div>
            </div>
            <Button
                type={"submit"}
                disabled={disabled}
                onMouseOver={handleMouseOver}
                BtnText={loading ? "loading" : "Delete"}
            />
        </form>
    );
}
