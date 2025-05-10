import { Link } from "react-router-dom";

export default function NotePage({ note, onClose }) {

    return (
        <div className="relative bg-white rounded-xl shadow-xl p-5 md:p-6 w-[60%] md:w-[40%] z-50">
            <button
                onClick={onClose}
                className="absolute top-2 right-3 text-2xl text-gray-700 hover:text-black"
            >
                ×
            </button>
            <Link to={`/channel/${note.note_ownerId}`}>
                <div className="flex items-center gap-4 mb-4">
                    <img
                        src={note.avatar}
                        alt="Avatar"
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-300"
                    />
                    <div>
                        <p className="font-semibold text-gray-800 text-md md:text-lg">
                            @{note.userName}
                        </p>
                        <p className="text-gray-500 text-xs md:text-sm">
                            {note.firstName} {note.lastName}
                        </p>
                    </div>
                </div>
            </Link>
            <h2 className="text-xl md:text-2xl font-bold border-b border-gray-300 pb-2 text-blue-700 mb-2">
                {note.note_title}
            </h2>
            <p className="text-gray-800 text-md whitespace-pre-line">
                {note.note_content}
            </p>
            <p className="text-gray-400 text-sm mt-4">
                Last updated: {new Date(note.note_updatedAt).toLocaleString()}
            </p>
        </div>
    );
}
