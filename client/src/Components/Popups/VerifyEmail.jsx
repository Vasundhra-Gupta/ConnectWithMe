import { useState } from "react";
import { verifyEmail } from "../../Services/authService";
import { toast } from "react-toastify";
import Button from "../General/Button";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail({ email }) {
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState(new Array(6).fill(""));
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();
    function handleMouseOver() {
        if (!code || !email) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setDisabled(true);
        try {
            const res = await verifyEmail({ email, code: code.join("") });
            if (res && res.message === "email verified sucessfully") {
                toast("Email verified successfully");
                setTimeout(() => {
                    navigate("/login")
                },200);
            }
        } catch (error) {
            toast(error.message);
            console.log(error.message);
        } finally {
            setLoading(false);
            setDisabled(false);
        }
    }

    function handleCodeChange(value, index) {
        const newCode = [...code];
        newCode[index] = value.slice(-1);
        setCode(newCode);
        if (value && index < code.length - 1) {
            const nextInput = document.getElementById(`code-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    }
    return (
        <div className="absolute top-0 left-0 z-20 bg-gradient-to-br from-purple-50 to-blue-50 h-screen w-full flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="border border-gray-400 rounded-lg p-4"
            >
                <h2 className="text-center text-2xl font-bold text-blue-500 ">
                    Verify Your Email
                </h2>
                <div>
                    <input
                        type="email"
                        placeholder="your@gmail.com"
                        value={email}
                        className="my-4 w-full h-10 rounded-md border indent-2 border-gray-400"
                        disabled
                    />
                </div>
                <p className="mb-2">Enter 6-digit code</p>
                <div className="flex justify-center gap-2 mb-1">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            id={`code-${index}`}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) =>
                                handleCodeChange(e.target.value, index)
                            }
                            className="w-10 h-10 text-center border border-gray-400 rounded-md text-lg outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    ))}
                </div>
                <p className="text-xs text-gray-500 mb-3">
                    The code will expire in 3 minutes!
                </p>
                <div className="text-center">
                    <Button
                        type={"submit"}
                        BtnText={loading ? "Loading..." : "Submit"}
                        onMouseOver={handleMouseOver}
                        disabled={disabled}
                    />
                </div>
            </form>
        </div>
    );
}
