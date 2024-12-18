const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result); // Get Base64 result
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

// Handle File Input Change
export const handleFileChange = async (file) => {
    const base64String = await fileToBase64(file);
    return base64String;
};

// Convert Base64 back to File
const base64ToFile = (base64, fileName) => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1]; // Extract MIME type
    const bstr = atob(arr[1]); // Decode Base64
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
};

// Handle Base64 to File Conversion and Attach to Input
export const handleBase64ToFile = () => {
    if (base64) {
        const file = base64ToFile(base64, fileName || "converted_file.png");
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        return dataTransfer.files;
    } else {
        alert("No Base64 data available to convert!");
    }
};