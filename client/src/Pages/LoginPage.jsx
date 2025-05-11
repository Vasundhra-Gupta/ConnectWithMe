import Login from "../Components/Auth/Login.jsx";

export default function LoginPage() {
    return (
        <div className="absolute z-20 top-0 left-0 w-full min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col items-center justify-center p-4">
            <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-purple-700 mb-2">
                        Welcome Back!
                    </h1>
                    <p className="text-gray-600">
                        Login to your account to get started
                    </p>
                </div>
            <Login />
        </div>
    );
}
