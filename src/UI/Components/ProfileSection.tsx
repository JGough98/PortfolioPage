import React from "react";

interface ProfileSectionProps {
    profileUrl: string;
    profileAlt?: string;
    size?: number;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
    profileUrl,
    profileAlt = "ProfileImage",
    size = 128
}) => {
    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 1500
        }}>
            {/* Profile Picture Container */}
            <div style={{
                position: "absolute",
                top: 20,
                left: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pointerEvents: "none"
            }}>
                {/* Profile Picture with Hand-drawn Border */}
                <div style={{
                    position: "relative",
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    border: "3px solid #000",
                    boxShadow: "0 0 0 2px #000", // Additional border effect for hand-drawn look
                }}>
                    <img
                        src={profileUrl}
                        alt={profileAlt}
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            objectFit: "cover",
                            display: "block",
                            transform: "rotate(2deg)", // Counter-rotate the image
                        }}
                    />
                </div>

                {/* Connecting Line */}
                <div style={{
                    width: "4px",
                    height: "calc(100vh - 380px)", // Dynamic height to reach near social icons
                    background: "#000",
                    position: "relative",
                    borderRadius: "2px", // Slightly rounded edges for hand-drawn look
                }} />
            </div>
        </div>
    );
};

export default ProfileSection; 