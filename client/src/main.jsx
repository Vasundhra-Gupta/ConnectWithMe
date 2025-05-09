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
    ChannelProfilePage,
    HomePage,
    LoginPage,
    NotePage,
    RegisterPage,
    ChatPage,
    ErrorPage,
} from "./Pages/index.js";
import "./Styles/index.css";
import { UserContextProvider } from "./Components/Context/UserContext.jsx";
import SettingPage from "./Pages/SettingsPage.jsx";
import AboutPage from "./Pages/AboutPage.jsx";
import ChannelAbout from "./Components/Channel/ChannelAbout.jsx";
import ChannelNotes from "./Components/Channel/ChannelNotes.jsx";
import EditNotePage from "./Pages/EditNotePage.jsx";
import {
    DeleteAccount,
    UpdateChannelDetails,
    UpdatePassword,
    UpdatePersonalDetails,
    DeleteNote,
    AddNote,
    PublicNotes,
    PrivateNotes,

} from "./Components/index.js";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/error" element={<ErrorPage />}></Route>
            <Route path="/about" element={<AboutPage />}></Route>
            <Route path="/channel/:channelId" element={<ChannelProfilePage />}>
                <Route path="" element={<ChannelNotes />}></Route>
                <Route path="about" element={<ChannelAbout />}></Route>
            </Route>
            <Route path="/settings" element={<SettingPage />}>
                <Route path="" element={<UpdatePersonalDetails />}></Route>
                <Route
                    path="delete-account"
                    element={<DeleteAccount />}
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
            <Route path="/public/:noteId" element={<PublicNotes />}></Route>
            <Route path="/private/:noteId" element={<PrivateNotes />}></Route>
            <Route path="/add" element={<AddNote/>}></Route>
            <Route path="/edit/:noteId" element={<EditNotePage />}></Route>
            <Route path="/delete" element={<DeleteNote />}></Route>
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
