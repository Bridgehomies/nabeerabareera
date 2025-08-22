"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

export default function ClientImage({ ...props }: ImageProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageError(true);
    e.currentTarget.src = "/placeholder.svg";
  };

  if (imageError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-200">
        <span className="text-gray-500">Image not available</span>
      </div>
    );
  }

  return (
    <Image
      {...props}
      fill
      onError={handleImageError}
    />
  );
}