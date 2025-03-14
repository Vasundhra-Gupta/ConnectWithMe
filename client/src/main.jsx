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

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/error" element={<ErrorPage />}></Route>
            <Route
                path="/channel/:channelId"
                element={<ChannelProfilePage/>}
            ></Route>
            <Route path="/note" element={<NotePage />}></Route>
            <Route path="/note/add" element={<AddNotePage />}></Route>
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
