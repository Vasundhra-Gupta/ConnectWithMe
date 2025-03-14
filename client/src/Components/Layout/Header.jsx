import { Link } from "react-router-dom";
import Button from "../General/Button";

export default function Header() {
  return (
      <div className="fixed top-0 w-full h-[60px] bg-lime-100 flex items-center justify-between px-6 shadow-md">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
              <img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Logo" className="h-8 w-8 rounded-full" />
              <p className="text-xl font-bold">MyDiary</p>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-grow mx-4 max-w-lg">
              <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
          </div>

          {/* Right: Navigation Buttons */}
          <div className="flex items-center gap-4">
            <Link to={"/chat"}> <Button BtnText={"Chat"}/></Link>
            <Link to={"/login"}> <Button BtnText={"Login"}/></Link>
            <Link to={"/register"}> <Button BtnText={"Register"}/></Link>
              
          </div>
      </div>
  );
}
