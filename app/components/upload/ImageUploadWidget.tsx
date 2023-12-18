"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";

declare global {
  var cloudinary: any;
}
interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
  fileCount: number;
}
const ImageUploadWidget: React.FC<ImageUploadProps> = ({
  onChange,
  value,
  fileCount,
}) => {
  const handleSubmit = useCallback(
    (result: any) => {
      try {
        const secureUrl = result.info.secure_url;
        onChange(secureUrl); // Speichere die secure_url als "userImage"
      } catch (error) {
        console.error("Error handling image upload result:", error);
      }
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleSubmit}
      uploadPreset="ghreivpa"
      options={{
        maxFiles: fileCount,
        sources: ["local"],
        folder: "ugh5/avatar",
        clientAllowedFormats: ["webp", "jpg", "jpeg", "png"],
        maxFileSize: 10000000, /// ca 10 mB
        maxImageWidth: 500,
        maxImageHeight: 500,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
                    relative
                    cursor-pointer
                    hover:opacity-70
                    transition
                    border-dashed 
                    border-2 
                    p-20 
                    border-neutral-300
                    flex
                    flex-col
                    justify-center
                    items-center
                    gap-4
                    text-neutral-600
                  "
          >
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div
                className="
                    absolute inset-0 w-full h-full"
              >
                <Image
                  fill
                  style={{ objectFit: "scale-down" }}
                  src={value}
                  alt="Picture"
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUploadWidget;
