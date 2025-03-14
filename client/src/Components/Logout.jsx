import { useState } from "react";
import { useUserContext } from "../Context/UserContext";
import { logoutUser } from "../Services/userService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "./General/Button";

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
            }else{
                throw new Error(response.message);
            }
        } catch (error) {
            navigate("/error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Link to={"/logout"}>
            <Button BtnText={loading? "Loading": "Logout"} onClick={handleClick} />
        </Link>
    );
}
