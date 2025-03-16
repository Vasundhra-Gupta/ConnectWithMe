import Login from "../Components/Auth/Login.jsx";

export default function LoginPage() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="text-lg text-center font-semibold">
                Login To Your Account
            </div>
            <Login />
        </div>
    );
}
