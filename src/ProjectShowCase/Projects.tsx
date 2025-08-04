import React from 'react';
import ProjectElement, { ProjectElementProps } from './ProjectElement';


  export interface ProjectsProps {
    projects: ProjectElementProps[];
  }

  const Projects: React.FC<ProjectsProps> = ({ projects }) => (
    <>
      {projects.map((project, i) => (
        <ProjectElement
          key={i}
          title={project.title}
          description={project.description}
          image={project.image}
          repoLink={project.repoLink}
          docLink={project.docLink}
        />
      ))}
    </>
  );
  
  export default Projects;