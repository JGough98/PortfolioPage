import React from "react";

interface ProfileImgProps {
  url: string;
  alt?: string;
  size?: number;
}

const ProfileImg: React.FC<ProfileImgProps> = ({ url, alt = "", size = 128 }) => {
  return (
    <img
      src={url}
      alt={alt}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        objectFit: "cover",
        display: "block",
        position: "fixed",
        top: 12,
        left: 12,
        zIndex: 2000
      }}
    />
  );
};

export default ProfileImg;