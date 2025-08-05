import React, { useState, useMemo } from 'react';
import ProjectModel from './ProjectModel';
import LanguageFilter from '../../LanguageFilter';
import { ProjectRepoDTO } from '../../../Scripts/Endpoints/Interpreted/GetPortfolioRepos';

export interface ProjectsProps {
  projects: ProjectRepoDTO[];
}

const ProjectModelManager: React.FC<ProjectsProps> = ({ projects }) => {
  // Track expanded state for each project
  const [expanded, setExpanded] = useState<boolean[]>(() => projects.map(() => false));
  
  // Track selected languages for filtering (these will be hidden)
  const [selectedLanguages, setSelectedLanguages] = useState<Set<string>>(new Set());

  // Get all unique languages from projects
  const allLanguages = useMemo(() => {
    const languages = new Set<string>();
    projects.forEach(project => {
      project.languages?.forEach(lang => {
        languages.add(lang.deviconName);
      });
    });
    return Array.from(languages);
  }, [projects]);

  // Filter projects based on selected languages (hide projects where ALL languages are faded)
  const filteredProjects = useMemo(() => {
    if (selectedLanguages.size === 0) {
      return projects;
    }
    
    return projects.filter(project => {
      // Only hide projects where ALL of their languages are faded/selected
      const projectLanguages = project.languages?.map(lang => lang.deviconName) || [];
      if (projectLanguages.length === 0) return true; // Show projects with no languages
      
      // Check if ALL languages in this project are faded
      const allLanguagesFaded = projectLanguages.every(lang => 
        selectedLanguages.has(lang)
      );
      
      // Show the project if NOT all languages are faded
      return !allLanguagesFaded;
    });
  }, [projects, selectedLanguages]);

  const handleExpand = (index: number) => {
    setExpanded(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages(prev => {
      const updated = new Set(prev);
      if (updated.has(language)) {
        updated.delete(language);
      } else {
        updated.add(language);
      }
      return updated;
    });
  };

  return (
    <>
      <LanguageFilter 
        languages={allLanguages}
        onLanguageToggle={handleLanguageToggle}
        selectedLanguages={selectedLanguages}
      />
      {filteredProjects.map((project, i) => (
        <ProjectModel
          key={i}
          project={project}
          isExpanded={expanded[i]}
          onExpand={() => handleExpand(i)}
        />
      ))}
    </>
  );
};

export default ProjectModelManager;