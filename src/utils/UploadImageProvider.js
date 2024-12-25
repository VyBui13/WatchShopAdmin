const fetchUrl = "https://api.cloudinary.com/v1_1/di98tgjbr/image/upload";

export const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "firsttime");
    formData.append("cloud_name", "di98tgjbr");

    const response = await fetch(fetchUrl, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Failed to upload ${image.productName}`);
    }

    const data = await response.json();
    return data.url;
};