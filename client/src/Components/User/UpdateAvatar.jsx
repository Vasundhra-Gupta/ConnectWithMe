import { useNavigate } from "react-router-dom";
import { updateAvatar } from "../../Services/userService";
import { useRef, useState } from "react";
import Button from "../General/Button";
import { fileRestrictions } from "../../utils/fileRestrictions";
import { useUserContext } from "../Context/UserContext";

export default function UpdateAvatar({ onClose }) {
    const { user } = useUserContext();
    const [avatar, setAvatar] = useState("");
    const [preview, setPreview] = useState(user?.user_avatar);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const fileRef = useRef();

    const handleFileChange = (e) => {
        const { files, name } = e.target;
        const file = files[0];
        fileRestrictions(name, file, setError);
        setAvatar(e.target.files[0]);

        // const previewURL = URL.createObjectURL(file);
        // setPreview(previewURL);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const res = await updateAvatar(avatar);
            if (res && res.message === "avatar updated successfully") {
                console.log("SUCCESS");
            }
        } catch (error) {
            console.log(error.message);
            navigate("/error");
        } finally {
            setLoading(false);
            navigate(0);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-2xl text-gray-700 hover:text-black z-30"
                >
                    ×
                </button>
                <h3 className="text-lg font-semibold">Upload Avatar</h3>
                <label htmlFor="avatar"></label>
                <Button
                    BtnText={
                        <img
                            src={preview}
                            alt="preview"
                            className={`w-32 h-32 rounded-full object-cover border-[3px] ${
                                error?.["avatar"]
                                    ? "border-red-500"
                                    : "border-green-600"
                            }`}
                            onClick={() => fileRef.current.click()}
                        />
                    }
                    type={"button"}
                    className="bg-transparent hover:bg-transparent mb-4"
                />
                <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    onChange={handleFileChange}
                    className="hidden"
                    ref={fileRef}
                />
                <div className="text-red-500 text-xs ml-1 mb-4">
                    {error?.["avatar"] && error["avatar"]}
                </div>
                <Button
                    disabled={loading || error?.["avatar"]}
                    BtnText={loading ? "Loading..." : "Upload"}
                />
            </form>
        </div>
    );
}
