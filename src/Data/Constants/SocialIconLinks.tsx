import EmailIcon from '../../Images/Email.png';

export type SocialIconLink = {
    href: string;
    imgUrl: string;
    alt?: string;
};


const socialLinks: SocialIconLink[] = [
    {
        href: "https://github.com/JGough98",
        imgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        alt: "GitHub"
    },
    {
        href: "https://linkedin.com/in/yourprofile",
        imgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
        alt: "LinkedIn"
    },
    {
        href: "mailto:jwgough98@gmail.com",
        imgUrl: EmailIcon,
        alt: "Email"
    },
];

export default socialLinks;