import { Link, Outlet } from "react-router-dom";
import { useUserContext } from "../Context/UserContext";
import Button from "../Components/General/Button";

export default function SettingPage() {
    const { user } = useUserContext();
    console.log(user);

    const tabs = [
        { name: "Personal Details", to: "update-personal" },
        { name: "Password", to: "update-password" },
        { name: "Channel Details", to: "update-channel" },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Left Sidebar (Profile Info) */}
            <div className="w-1/4 bg-white p-6 shadow-lg">
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
                    <div className="text-xl font-bold mt-3">@{user?.user_name}</div>
                    <div className="text-gray-600">
                        {user?.user_firstName} {user?.user_lastName}
                    </div>
                    <Button BtnText={"Delete Account"}/>
                </div>
            </div>

            {/* Right Section (Settings & Tabs) */}
            <div className="w-3/4 p-6">
                {/* Tabs */}
                <div className="flex space-x-6 border-b pb-2">
                    {tabs.map((tab) => (
                        <Link 
                            key={tab.name} 
                            to={tab.to} 
                            className="px-4 py-2 text-gray-700 font-medium hover:text-blue-500 border-b-2 border-transparent hover:border-blue-500 transition-all"
                        >
                            {tab.name}
                        </Link>
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
