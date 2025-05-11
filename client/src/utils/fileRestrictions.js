export const fileRestrictions = (name, file, setError) => {
    const MAX_SIZE = 2 * 1024 * 1024;
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];
    if (!file) return;
    switch (name) {
        case "avatar":
        case "coverImage": {
            if (!ALLOWED_TYPES.includes(file.type)) {
                setError((prev) => ({
                    ...prev,
                    [name]: "Only JPEG or PNG files are allowed.",
                }));
                return;
            } else {
                setError((prev) => ({
                    ...prev,
                    [name]: "",
                }));
            }
            if (file.size > MAX_SIZE) {
                setError((prev) => ({
                    ...prev,
                    [name]: "File size must be less than 2MB.",
                }));
                return;
            } else {
                setError((prev) => ({
                    ...prev,
                    [name]: "",
                }));
            }
            break;
        }
    }
};
