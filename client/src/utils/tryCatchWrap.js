export const tryCatch = async (
    operation,
    url,
    method,
    credentials = "omit",
    headers={},
    body
) => {
    try {
        const res = await fetch(url, {
            method,
            credentials,
            headers,
            body,
        });

        const response = await res.json();
        
        console.log(response);
        if (response.status === 500) {
            throw new Error(res.message);
        }
        return response;
    } catch (error) {
        console.log(`error in ${operation} service`, error);
        throw error;
    }
};
