import { Link } from "react-router-dom";
import Button from "../General/Button";
import Logout from "../Auth/Logout";
import { useUserContext } from "../Context/UserContext";
import { LOGO } from "../../Assets/logo.js";

export default function Header() {
    const { user } = useUserContext();
    return (
        <div className="fixed top-0 w-full h-[60px] bg-lime-100 flex items-center justify-between px-5 shadow-md z-20">
            {/* Logo */}
            <Link to={"/"} className="flex justify-center gap-3 items-center">
                <div>
                    <img
                        src={LOGO}
                        alt="Logo"
                        className="h-9 w-9 rounded-full border border-gray-500"
                    />
                </div>
                <p className="hidden md:block text-xl font-bold">
                    connectWithMe
                </p>
            </Link>

            {/* Searchbar */}
            <div className="hidden md:block flex-grow mx-4 max-w-xl">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
            </div>
            {/* Navigation Buttons */}
            {user ? (
                <div className="flex items-center gap-4">
                    <Link to={"/add"}>
                        <Button BtnText={"+"} />
                    </Link>
                    {/* <Link to={"/chat"}>
                        <Button BtnText={"Chat"} />
                    </Link> */}
                    <Logout />
                    <Link to={`/channel/${user.user_id}`}>
                        <div className="w-9 h-9 overflow-hidden">
                            <img
                                src={user.user_avatar}
                                alt="avatar"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                    </Link>
                </div>
            ) : (
                <div className="flex items-center gap-4">
                    <Link to={"/login"}>
                        <Button BtnText={"Login"} />
                    </Link>
                    <Link to={"/register"}>
                        <Button BtnText={"Register"} />
                    </Link>
                </div>
            )}
        </div>
    );
}
