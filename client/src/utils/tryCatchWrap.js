export const tryCatch = async (
    operation,
    url,
    method,
    credentials = "omit",
    headers={},
    body
) => {
    try {
        const isFormData = body instanceof FormData;

        const res = await fetch(url, {
            method,
            credentials,
            headers: isFormData ? headers : { "Content-Type": "application/json", ...headers },
            body: isFormData? body: JSON.stringify(body),
        });

        const response = await res.json();
        console.log(response);
        if (response.status === 500) {
            console.log(res.message);
            throw new Error(res.message);
        }
        return response;
    } catch (error) {
        console.log(`error in ${operation} service`, error.message);
        throw error;
    }
};
