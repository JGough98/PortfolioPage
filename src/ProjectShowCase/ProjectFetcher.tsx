import { ProjectsProps } from './Projects';


export const ProjectFetcher = (): ProjectsProps => {
    return {
      projects: [
        {
          title: "Project 1",
          description: "Description 1",
          image: "image1.jpg",
          repoLink: "https://www.google.com",
          docLink: "https://www.google.com"
        },
        {
          title: "Project 2", 
          description: "Description 2",
          image: "image2.jpg",
          repoLink: "https://www.github.com",
          docLink: "https://www.docs.com"
        },
        {
          title: "Project 3",
          description: "Description 3",
          image: "image3.jpg",
          repoLink: "https://www.example.com",
          docLink: "https://www.example-docs.com"
        }
      ]
    };
  };
  
  export default ProjectFetcher;