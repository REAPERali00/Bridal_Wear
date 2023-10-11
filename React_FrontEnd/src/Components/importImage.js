import React from 'react';

function ImportImg() {

    function placeImage(event) {
        const image_input = event.target;
        if (image_input.files && image_input.files[0]) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                const uploaded_image = reader.result;
                const display_images = document.querySelectorAll(".display_image");
                display_images[0].style.backgroundImage = `url(${uploaded_image})`;
                display_images[0].style.backgroundRepeat = "no-repeat";
                display_images[0].style.backgroundPosition = "center";
            });

            reader.readAsDataURL(image_input.files[0]);
        }
    }

    return (
        <label htmlFor="image_input" className="upload-file">
            <span>Upload file</span>
            <input type="file" id="image_input" accept="image/png, image/jpg" onChange={placeImage} />
        </label>
    );
}

export default ImportImg;
