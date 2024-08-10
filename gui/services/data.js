
export async function readJsonFile(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new TypeError("Received content is not JSON");
        }
        const jsonObject = await response.json();
        return jsonObject;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


