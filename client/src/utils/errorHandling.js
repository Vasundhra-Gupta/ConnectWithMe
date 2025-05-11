//error handling
export const verify = (name, value, setError) => {
    switch (name) {
        case "userName": case "searchInput": {
            const regex = /^[a-zA-Z0-9_]{3,16}$/;
            if (!regex.test(value)) {
                setError((prev) => ({
                    ...prev,
                    [name]: "Username must be 3-16 characters with no special symbols(except unserscore).",
                }));
            } else {
                setError((prev) => ({
                    ...prev,
                    [name]: "",
                }));
            }
            break;
        }
        case "firstName":
        case "lastName": {
            const regex = /^[a-zA-Z]{3,16}$/;
            if (!regex.test(value)) {
                setError((prev) => ({
                    ...prev,
                    [name]: `${name} must be 3-16 characters including only alphabets.`,
                }));
            } else {
                setError((prev) => ({
                    ...prev,
                    [name]: "",
                }));
            }
            break;
        }
        case "contact": {
            const regex = /^[0-9]{10}$/;
            if (!regex.test(value)) {
                setError((prev) => ({
                    ...prev,
                    [name]: "Invalid contact number.",
                }));
            } else {
                setError((prev) => ({
                    ...prev,
                    [name]: "",
                }));
            }
            break;
        }
        case "email": {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regex.test(value)) {
                setError((prev) => ({
                    ...prev,
                    [name]: "Invalid email.",
                }));
            } else {
                setError((prev) => ({
                    ...prev,
                    [name]: "",
                }));
            }
            break;
        }
        case "password":
        case "confirmPassword": {
            if (value.length < 6 || value.length > 10) {
                setError((prev) => ({
                    ...prev,
                    [name]: "Password must be between 6-10 characters.",
                }));
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
