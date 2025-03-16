import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import {
    AddNotePage,
    ChannelProfilePage,
    HomePage,
    LoginPage,
    NotePage,
    RegisterPage,
    ChatPage,
    ErrorPage,
} from "./Pages/index.js";
import "./Styles/index.css";
import { UserContextProvider } from "./Context/UserContext.jsx";
import Logout from "./Components/Auth/Logout.jsx";
import UpdatePersonalDetails from "./Components/User/UpdatePersonalDetails.jsx";
import UpdateChannelDetails from "./Components/User/UpdateChannelDetails.jsx";
import UpdatePassword from "./Components/User/UpdatePassword.jsx";
import SettingPage from "./Pages/SettingsPage.jsx";
import AboutPage from "./Pages/AboutPage.jsx";
import ChannelAbout from "./Components/Channel/ChannelAbout.jsx";
import ChannelNotes from "./Components/Channel/ChannelNotes.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/error" element={<ErrorPage />}></Route>
            <Route path="/about" element={<AboutPage />}></Route>
            <Route
                path="/channel/:channelId"
                element={<ChannelProfilePage />}
            >
                <Route
                    path="notes"
                    element={<ChannelNotes />}
                ></Route>
                <Route
                    path="about"
                    element={<ChannelAbout />}
                ></Route>
            </Route>
            <Route path="/settings" element={<SettingPage />}>
                <Route
                    path="update-personal"
                    element={<UpdatePersonalDetails />}
                ></Route>
                <Route
                    path="update-channel"
                    element={<UpdateChannelDetails />}
                ></Route>
                <Route
                    path="update-password"
                    element={<UpdatePassword />}
                ></Route>
            </Route>
            <Route path="/note" element={<NotePage />}></Route>
            <Route path="/add" element={<AddNotePage />}></Route>
            <Route path="/chat" element={<ChatPage />}></Route>
        </Route>
    )
);

createRoot(document.getElementById("root")).render(
    // <StrictMode>
    <UserContextProvider>
        <RouterProvider router={router}>
            <App />
        </RouterProvider>
    </UserContextProvider>
    // </StrictMode>
);
