import { Link, NavLink, Outlet } from "react-router-dom";
import Button from "../Components/General/Button";
import { useUserContext } from "../Components/Context/UserContext";

export default function ChannelProfilePage() {
    const { user } = useUserContext();
    console.log(user);

    const tabs = [
        { name: "Notes", to: "" },
        { name: "About", to: "about" },
    ];

    return (
        <div className="min-h-screen">
            {/* Upper Section: Cover Image */}
            <div className="relative w-full h-52 bg-gray-200">
                {user?.user_coverImage && (
                    <img
                        src={user?.user_coverImage}
                        alt="Cover"
                        className="w-full h-full object-cover"
                    />
                )}
            </div>

            {/* Profile Section */}
            <div className="flex flex-col items-center mt-[-50px]">
                <div className="w-36 h-36 rounded-full border-4 border-white bg-gray-200 overflow-hidden z-10">
                    {user?.user_avatar && (
                        <img
                            src={user.user_avatar}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
                <div className="text-xl font-bold mt-2">@{user?.user_name}</div>
                <div className="text-gray-600">
                    {user?.user_firstName} {user?.user_lastName}
                </div>

                {/* Edit Button */}
                <div className="mt-3">
                    <Link to="/settings">
                        <Button
                            BtnText="Edit"
                            className=" text-white shadow-md transition-all"
                        />
                    </Link>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="mt-10 mx-2 md:mx-10 flex justify-around border-b-4">
                {tabs.map((tab) => (
                    <NavLink
                        end //so that partial match na ho , comoplete match ho
                        key={tab.name}
                        to={tab.to}
                        className={({ isActive }) =>
                            isActive
                                ? "text-blue-500 bg-blue-200 border-blue-500 w-full font-medium border-b-2 px-4 py-2 transition-all text-center"
                                : "text-gray-700 w-full font-medium border-b-2 border-transparent px-4 py-2 transition-all text-center"
                        }
                    >
                        {tab.name}
                    </NavLink>
                ))}
            </div>

            {/* Page Content */}
            <div className=" py-2">
                <Outlet />
            </div>
        </div>
    );
}
