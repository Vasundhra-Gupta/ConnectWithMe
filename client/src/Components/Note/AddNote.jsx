import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../General/Button.jsx";
import { addNote } from "../../Services/noteService.js";
import { useUserContext } from "../Context/UserContext.jsx";
// import { getCategories } from "../../Services/CategoryService.js";

export default function AddNote() {
    const { user } = useUserContext();
    const [note, setNote] = useState("");
    // const [categories, setCategories] = useState([]);
    // const [selectedCategory, setSelectedCategory] = useState("");

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        title: "",
        content: "",
        category: "",
        note_visibility: "Private", // default
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleMouseOver = () => {
        const { title, content } = inputs;
        if (!title || !content || error) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    };

    // const getCategories = async () => {
    //     try {
    //         const categories = await getCategories();
    //         if (categories && !categories.message) {
    //             setCategories(categories);
    //         }
    //     } catch (error) {
    //         console.log(error.message);
    //         navigate("/error");
    //     }
    // };

    // const categoryElements = categories.map((category, index) => (
    //     <div key={index} className="flex items-center gap-2">
    //         <input
    //             type="radio"
    //             name="noteCategory"
    //             value={category?.category_name}
    //             checked={selectedCategory === category}
    //             onChange={(e) => setSelectedCategory(e.target.value)}
    //             className="accent-violet-500"
    //         />
    //         <label className="capitalize text-gray-700">{category}</label>
    //     </div>
    // ));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setDisabled(true);
            setError(null);

            const res = await addNote(inputs);

            if (res && !res.message) {
                setNote(res);
                navigate(`/channel/${user?.user_id}`);
                setInputs({
                    title: "",
                    content: "",
                });
            } else {
                setNote(null);
                setError(res.message);
            }
        } catch (err) {
            console.error("Server error:", err);
            navigate("/error");
        } finally {
            setLoading(false);
            setDisabled(false);
            navigate(0);
        }
    };

    return (
        <div className="my-4">
            <form
                className="shadow-lg border border-gray-400 rounded-lg p-4 bg-white"
                onSubmit={handleSubmit}
            >
                <p className="font-semibold text-center my-2 text-xl">
                    Add a note
                </p>
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
                    BtnText={loading ? "Adding..." : "Add Note"}
                />
            </form>
        </div>
    );
}
