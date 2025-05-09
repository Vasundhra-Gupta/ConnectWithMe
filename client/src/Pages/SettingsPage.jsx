import { NavLink, Outlet } from "react-router-dom";
import { useUserContext } from "../Components/Context/UserContext";
import Button from "../Components/General/Button";
import { useState } from "react";
import { DeleteAccount } from "../Components";

export default function SettingPage() {
    const { user } = useUserContext();
    const [showPopup, setShowPopup] = useState(false);
    // console.log(user);

    const tabs = [
        { name: "Personal Details", to: "" },
        { name: "Password", to: "update-password" },
        { name: "Channel Details", to: "update-channel" },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Left Sidebar (Profile Info) */}
            <div className="w-1/3 bg-white p-6 shadow-lg">
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-300">
                        {user?.user_avatar && (
                            <img
                                src={user.user_avatar}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                    <div className="text-xl font-bold mt-3">
                        @{user?.user_name}
                    </div>
                    <div className="text-gray-600">
                        {user?.user_firstName} {user?.user_lastName}
                    </div>
                    <div>{user?.user_bio}</div>
                    <Button
                        BtnText={"Delete Account"}
                        onClick={() => setShowPopup(true)}
                    />
                </div>
                {showPopup && <DeleteAccount />}
            </div>

            {/* Right Section (Settings & Tabs) */}
            <div className="w-2/3 p-6">
                {/* Tabs */}
                <div className="flex space-x-6 border-b pb-2">
                    {tabs.map((tab) => (
                        <NavLink
                            end
                            key={tab.name}
                            to={tab.to}
                            className={({ isActive }) =>
                                isActive
                                    ? "px-4 py-2 font-medium text-blue-500 border-b-2 border-blue-500 transition-all"
                                    : "px-4 py-2  border-b-2 border-transparent transition-all font-medium text-gray-700"
                            }
                        >
                            {tab.name}
                        </NavLink>
                    ))}
                </div>

                {/* Page Content */}
                <div className="mt-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
