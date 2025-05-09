import {
    Link,
    NavLink,
    Outlet,
    useParams,
    useNavigate,
} from "react-router-dom";
import Button from "../Components/General/Button";
import { useEffect } from "react";
import { getChannelProfile } from "../Services/userService";
import { useUserContext } from "../Components/Context/UserContext";
import { useChannelContext } from "../Components/Context/ChannelContext";

export default function ChannelProfilePage() {
    const { channelId } = useParams();
    const { user } = useUserContext();
    const {channel, setChannel} = useChannelContext();
    const navigate = useNavigate();
    const tabs = [
        { name: "Notes", to: "" },
        { name: "About", to: "about" },
    ];

    useEffect(() => {
        (async () => {
            try {
                const channel = await getChannelProfile(channelId);
                if (channel && !channel.message) {
                    setChannel(channel);
                }
            } catch (error) {
                setChannel(null);
                navigate("/error");
                console.log(error.message);
            }
        })();
    }, []);

    return (
        <div className="min-h-screen">
            {/* Upper Section: Cover Image */}
            <div className="relative w-full h-52 bg-gray-200">
                {channel?.user_coverImage && (
                    <img
                        src={channel?.user_coverImage}
                        alt="Cover"
                        className="w-full h-full object-cover"
                    />
                )}
            </div>

            {/* Profile Section */}
            <div className="flex flex-col items-center mt-[-50px]">
                <div className="w-36 h-36 rounded-full border-4 border-white bg-gray-200 overflow-hidden z-10">
                    {channel?.user_avatar && (
                        <img
                            src={channel.user_avatar}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
                <div className="text-xl font-bold mt-2">
                    @{channel?.user_name}
                </div>
                <div className="text-gray-600">
                    {channel?.user_firstName} {channel?.user_lastName}
                </div>

                {/* Edit Button */}
                {user?.user_id === channelId && (
                    <div className="mt-3">
                        <Link to="/settings">
                            <Button
                                BtnText="Edit"
                                className=" text-white shadow-md transition-all"
                            />
                        </Link>
                    </div>
                )}
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
