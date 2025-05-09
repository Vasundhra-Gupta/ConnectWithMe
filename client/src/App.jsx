import { useEffect, useState } from "react";
import Layout from "./Components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { getUser } from "./Services/authService";
import { useUserContext } from "./Components/Context/UserContext";

export default function App() {
    const navigate = useNavigate();
    const {setUser} = useUserContext()
    const [loading, setLoading] = useState(false);
    useEffect (()=> {
        (async function () {
            try {
                setLoading(true);
                const user = await getUser();
                if(user && !user.message){
                    setUser(user);
                    console.log(user);
                }
            } catch (error) {
                navigate('/error');
                setUser(null)
                console.log("error",error.message);
            }finally{
                setLoading(false);
            }
        })();
    }, [navigate])
    return (
        <div className="h-screen w-screen text-black">
            {loading? <div className="flex justify-center items-center h-full w-full text-center font-semibold">Loading...<br/>Please refresh if the page takes too long</div>: <Layout />}
        </div>
    );
}
