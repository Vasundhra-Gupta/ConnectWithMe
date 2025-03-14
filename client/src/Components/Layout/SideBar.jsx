import { useState } from "react"

export default function SideBar() {
  const [showSideBar, setShowSideBar] = useState(true);
  return (
    <div  className="absolute top-0 left-0">
      {showSideBar? <div className="bg-pink-300 h-full w-[20%]"></div> : "SideBar"}
    </div>
  )
}
