import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ProjectModelManager from './UI/Models/Project/ProjectModelManager';
import getPortfolioRepos from './Scripts/Endpoints/Interpreted/GetPortfolioRepos';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Initialize with empty array, will be populated when data loads
let projectsData: any[] = [];

// Fetch the portfolio repos
getPortfolioRepos()
  .then(repos => {
    projectsData = repos;
    // Re-render with the fetched data
    root.render(
      <React.StrictMode>
        <ProjectModelManager projects={projectsData}/>
        <App />
      </React.StrictMode>
    );
  })
  .catch(error => {
    console.error('Failed to fetch projects:', error);
    // Render with empty projects on error
    root.render(
      <React.StrictMode>
        <ProjectModelManager projects={[]}/>
        <App />
      </React.StrictMode>
    );
  });

// Initial render with empty projects
root.render(
  <React.StrictMode>
    <ProjectModelManager projects={projectsData}/>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
