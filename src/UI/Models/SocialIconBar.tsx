import React from "react";
import { SocialIconLink } from "../../Data/SocialIconLinks";



interface SocialIconBarProps {
    links: SocialIconLink[];
}

const SocialIconBar: React.FC<SocialIconBarProps> = ({ links }) => {
    return (
        <div style={{
            position: "fixed",
            bottom: 0,
            left: 13,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem 0.5rem",
            zIndex: 1000,
            background: "transparent"
        }}>
            {links.map((link, idx) => (
                <a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ margin: "0.7rem 0" }}
                >
                    <img
                        src={link.imgUrl}
                        alt={link.alt || "icon"}
                        style={{ width: 32, height: 32, objectFit: "contain" }}
                    />
                </a>
            ))}
            <div style={{ width: 2, height: 80, background: "#222", marginTop: 16 }} />
        </div>
    );
};

export default SocialIconBar;