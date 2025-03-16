import { Link, Outlet } from "react-router-dom";
import { useUserContext } from "../Context/UserContext";

export default function SettingPage() {
    const { user } = useUserContext();
    console.log(user);
    const tabs = [
      { 
        name: "Personal Details", 
        to: "update-personal" 
      },
      { 
        name: "Password", 
        to: "update-password" 
      },
      { 
        name: "Channel Details", 
        to: "update-channel" 
      },
    ];

    const tabElements = tabs.map((tab)=>
    <Link key={tab.name} to={tab.to}>{tab.name}</Link>)
    return (
        <div>
            {/* upper */}
            <div>{user?.user_coverImage}</div>
            {/* mid */}
            <div className="flex justify-center">
                <div>{user?.user_avatar}</div>
                <div>@{user.user_name}</div>
                <div>
                    {user.user_firstName}
                    {user.user_lastName}
                </div>
            </div>
            {/* lower */}
            <div>
                <div>{tabElements}</div>
                <Outlet/>
            </div>
        </div>
    );
}
