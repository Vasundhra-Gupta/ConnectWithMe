import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Components/General/Button.jsx";
import { editNote } from "../Services/noteService.js";
import { useUserContext } from "../Components/Context/UserContext.jsx";

export default function EditNotePage({noteId, setNotess}) {
    const { user } = useUserContext();
    const [ setNotes] = useState("");
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
                setNotes(res);
                navigate(`/channel/${user?.user_id}`);
            } else {
                setNotes(null);
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

    // const inputFields = [
    //     {
    //         type: "text",
    //         name: "title",
    //         id: "title",
    //         required: true,
    //         label: "Title",
    //     },
    //     {
    //         type: "text",
    //         name: "content",
    //         id: "content",
    //         required: true,
    //         label: "Content",
    //     },
    //     {
    //         type: "text",
    //         name: "category",
    //         id: "category",
    //         label: "Category",
    //     },
    // ];

    // const inputElements = inputFields.map((field) => (
    //     <div key={field.name}>
    //         <div>
    //             <label htmlFor={field.name}>{field.label}</label>
    //         </div>
    //         <div>
    //             <input
    //                 type={field.type}
    //                 name={field.name}
    //                 id={field.id}
    //                 required={field.required}
    //                 onChange={handleChange}
    //                 className="w-full border-gray-400 shadow-md rounded-md outline-none p-[5px] indent-2"
    //             />
    //         </div>
    //     </div>
    // ));

    return (
            <div className="my-4">
                <form
                    className="shadow-lg border border-gray-400 rounded-lg p-4 bg-white"
                    onSubmit={handleSubmit}
                >
                    {error && (
                        <div className="text-red-500 text-sm mb-3 text-center">
                            {error}
                        </div>
                    )}
    
                    <input
                        type="text"
                        name="title"
                        value={inputs?.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="w-full border-b border-gray-400 outline-none text-lg mb-4 p-1"
                    />
    
                    <textarea
                        name="content"
                        value={inputs?.content}
                        onChange={handleChange}
                        placeholder="Write your insights"
                        className="w-full h-32 p-2 border border-gray-300 rounded-lg outline-none resize-none mb-4"
                    />
                    <Button
                        type="submit"
                        onMouseOver={handleMouseOver}
                        disabled={disabled}
                        className="rounded-full bg-violet-500 text-white px-4 py-2 hover:bg-violet-600"
                        BtnText={loading ? "Editing..." : "Edit Note"}
                    />
                </form>
            </div>
        );
}
