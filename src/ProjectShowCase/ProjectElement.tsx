import React from 'react';


  export interface ProjectElementProps {
    title: string;
    description: string;
    image?: string;
    repoLink: string;
    docLink?: string;
  }

  export const ProjectElement: React.FC<ProjectElementProps> = ({ title, description, image, repoLink, docLink }) => (
    <div className={`ProjectElement-${title}`}>
      <h2>{title}</h2>
      <p>{description}</p>
      {image && <img src={image} alt={title} />}
      <a href={repoLink}>Learn more</a>
      {docLink && <a href={docLink}>Documentation</a>}
    </div>
  );

  
export default ProjectElement;