import { useState } from "react";
import { logoutUser } from "../../Services/authService";
import { useNavigate } from "react-router-dom";
import Button from "../General/Button";
import { useUserContext } from "../Context/UserContext";

export default function Logout() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState();
    const { setUser } = useUserContext();
    async function handleClick() {
        setLoading(true);
        try {
            const response = await logoutUser();
            if (response.message == "user logged out successfully") {
                setUser(null);
                navigate("/");
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            navigate("/error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button
            BtnText={loading ? "Loading" : "Logout"}
            onClick={handleClick}
        />
    );
}
