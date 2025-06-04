import { useState } from "react";
import Cropper from "react-easy-crop";
import Button from "./Button";
import { getCroppedImg } from "../../utils/cropper";

export default function ImageCropper({ imagesrc, setInputs, setPreview }) {
    const [zoom, setZoom] = useState(1);
    const [crop, setCrop] = useState({
        x: 0,
        y: 0,
    });
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const handleCrop = async () => {
        const croppedImage = await getCroppedImg(imagesrc, croppedAreaPixels);
        setInputs((prev) => ({ ...prev, avatar: croppedImage }));
        setPreview(null);
    };

    return (
        <div>
            <div className="relative bg-none w-[400px] h-[400px]">
                <Cropper
                    image={imagesrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={(_, croppedAreaPixels) => {
                        setCroppedAreaPixels(croppedAreaPixels);
                    }}
                />
            </div>
            <div className="text-center">
                <input
                    className={"w-full my-4"}
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                />
                <Button onClick={handleCrop} BtnText={"Confirm Crop"} className="w-full mb-2 text-gray-200" />
            </div>
        </div>
    );
}
