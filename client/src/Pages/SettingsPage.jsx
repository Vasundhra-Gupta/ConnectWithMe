import { NavLink, Link, Outlet } from "react-router-dom";
import Button from "../Components/General/Button";
import { useState } from "react";
import { DeleteAccount, UpdateAvatar, UpdateCoverImage } from "../Components";
import { useUserContext } from "../Components/Context/UserContext";

export default function SettingPage() {
    const { user } = useUserContext();
    const [showPopup, setShowPopup] = useState({
        deleteAccount: false,
        avatar: false,
        coverImage: false,
    });

    const tabs = [
        { name: "Personal Details", to: "" },
        { name: "Password", to: "update-password" },
        { name: "Channel Details", to: "update-channel" },
    ];

    return (
        <div className="flex flex-col md:flex-row relative min-h-screen bg-gray-100">
            {/* Left Sidebar (Profile Info) - Now appears on top on mobile */}
            <div className="w-full md:w-1/4 bg-gray-200 p-4 md:p-6 rounded-lg md:ml-3 shadow-lg">
                <div className="flex flex-col items-center">
                    <div className="w-full rounded-lg overflow-hidden h-32 md:h-36 relative">
                        {user?.user_coverImage && (
                            <img
                                src={user.user_coverImage}
                                alt="coverImage"
                                className="w-full h-full object-cover"
                            />
                        )}
                        <button
                            className="z-30 p-2 text-sm bg-slate-200 bg-opacity-60 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            onClick={() =>
                                setShowPopup((prev) => ({
                                    ...prev,
                                    coverImage: true,
                                }))
                            }
                        >
                            ⬆
                        </button>
                    </div>
                    <div className="relative md:-mt-0 md:absolute -top-6 md:top-[130px] w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-gray-300">
                        {user?.user_avatar && (
                            <img
                                src={user.user_avatar}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        )}
                        <button
                            onClick={() =>
                                setShowPopup((prev) => ({
                                    ...prev,
                                    avatar: true,
                                }))
                            }
                            className="z-30 p-2 text-sm bg-slate-200 bg-opacity-60 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                            ⬆
                        </button>
                    </div>
                    <div className="text-xl font-bold -mt-2 md:mt-[4.75rem]">
                        @{user?.user_name}
                    </div>
                    <div className="text-gray-600 mb-1">
                        {user?.user_firstName} {user?.user_lastName}
                    </div>
                    <div className="mb-2 text-center px-2">{user?.user_bio}</div>
                    <Button
                        BtnText={"Delete Account"}
                        onClick={() =>
                            setShowPopup((prev) => ({
                                ...prev,
                                deleteAccount: true,
                            }))
                        }
                    />
                </div>
                {showPopup.deleteAccount && <DeleteAccount />}
            </div>

            {/* Right Section (Settings & Tabs) */}
            <div className=" md:w-3/4 p-4 md:p-6">
                {/* Tabs - Made scrollable for mobile */}
                <div className="flex space-x-4 md:space-x-6 border-b pb-2 ">
                    {tabs.map((tab) => (
                        <NavLink
                            end
                            key={tab.name}
                            to={tab.to}
                            className={({ isActive }) =>
                                `whitespace-nowrap px-3 py-2 text-sm md:text-base md:px-4 border-b-2 ${
                                    isActive
                                        ? "font-medium text-blue-500 border-blue-500"
                                        : "border-transparent font-medium text-gray-700"
                                }`
                            }
                        >
                            {tab.name}
                        </NavLink>
                    ))}
                </div>

                {/* Page Content */}
                <div className="mt-4 md:mt-6">
                    <Outlet />
                </div>
            </div>
            
            {/* Popups - Adjusted for mobile */}
            {showPopup.avatar && (
                <div className="fixed inset-0 text-center rounded-lg bg-black h-[40%] w-[90%] md:w-[60%] lg:w-[40%] xl:w-[20%] mt-[40%] md:mt-[20%] mx-auto bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
                    <UpdateAvatar
                        onClose={() =>
                            setShowPopup((prev) => ({ ...prev, avatar: false }))
                        }
                    />
                </div>
            )}
            {showPopup.coverImage && (
                <div className="fixed inset-0 text-center rounded-lg bg-black h-[40%] w-[90%] md:w-[60%] lg:w-[40%] xl:w-[20%] mt-[40%] md:mt-[20%] mx-auto bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
                    <UpdateCoverImage
                        onClose={() =>
                            setShowPopup((prev) => ({
                                ...prev,
                                coverImage: false,
                            }))
                        }
                    />
                </div>
            )}
        </div>
    );
}