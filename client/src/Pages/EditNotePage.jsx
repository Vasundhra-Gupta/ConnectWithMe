import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Components/General/Button.jsx";
import { editNote } from "../Services/noteService.js";
import { useUserContext } from "../Context/UserContext.jsx";

export default function EditNotePage() {
    const {user} = useUserContext();
    const {noteId} = useParams()
    const [note, setNote] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(null);
    const [inputs, setInputs] = useState({
        title: "",
        content: "",
        category: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleMouseOver = () => {
        if (
            Object.entries(inputs).some(
                ([key, value]) => !value && key != "category"
            ) ||
            error
        ) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            setDisabled(true);
            setError(null);
            const res = await editNote(inputs, noteId);
            if (res && res.message === "note edited successfully") {
                setNote(res);
                navigate(`/channel/${user?.user_id}`)
            } else {
                setNote(null);
                setError(res.message);
            }
        } catch (err) {
            console.log("server error", err);
            navigate("/error");
        } finally {
            setLoading(false);
            setDisabled(false);
        }
    };

    const inputFields = [
        {
            type: "text",
            name: "title",
            id: "title",
            required: true,
            label: "Title",
        },
        {
            type: "text",
            name: "content",
            id: "content",
            required: true,
            label: "Content",
        },
        {
            type: "text",
            name: "category",
            id: "category",
            label: "Category",
        },
    ];

    const inputElements = inputFields.map((field) => (
        <div key={field.name}>
            <div>
                <label htmlFor={field.name}>{field.label}</label>
            </div>
            <div>
                <input
                    type={field.type}
                    name={field.name}
                    id={field.id}
                    required={field.required}
                    onChange={handleChange}
                    className="w-full border-gray-400 shadow-md rounded-md outline-none p-[5px] indent-2"
                />
            </div>
        </div>
    ));

    return (
        <div className="min-h-screen w-screen flex justify-center items-center">
            <form
                className="shadow-lg px-6 py-3 w-[270px]"
                onSubmit={handleSubmit}
            >
                {error && (
                    <div className="text-red-500 text-center text-sm mb-3">
                        {error}
                    </div>
                )}
                {inputElements}
                <div className="text-center m-2">
                    <Button
                        type="submit"
                        onMouseOver={handleMouseOver}
                        disabled={disabled}
                        className=" bg-violet-400"
                        BtnText={loading ? "Loading" : "Edit Note"}
                    ></Button>
                </div>
            </form>
        </div>
    );
}
