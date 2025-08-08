import "./App.css";
import { useState } from "react";
import LoadingPage from "./UI/Models/LoadingPageModel";
import ProjectModelManager from "./UI/Models/Project/ProjectModelManager";
import { ProjectRepoDTO } from "./Scripts/Endpoints/Interpreted/GetPortfolioRepos";
import SocialIconBar from "./UI/Models/SocialIconBar";
import socialLinks from "./Data/Constants/SocialIconLinks";
import ProfileSection from "./UI/Components/ProfileSection";

type PageType = 'about' | 'projects' | 'contact';

function App() {
  const [portfolioData, setPortfolioData] = useState<ProjectRepoDTO[] | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState<PageType>('projects');

  const handleDataLoaded = (data: ProjectRepoDTO[]) => {
    setPortfolioData(data);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'about':
        return (
          <div className="notebook-page">
            <h2>About Me</h2>
            <div className="notebook-content">
              <p>
                Hi there! I'm a passionate developer who loves creating interesting projects
                and learning new technologies. I enjoy working with Unity for game development,
                React for web applications, and exploring various programming languages.
              </p>
              <p>
                When I'm not coding, you can find me experimenting with new frameworks,
                contributing to open source projects, or sharing knowledge with the developer community.
              </p>
              <div className="skills-section">
                <h3>Skills & Technologies</h3>
                <ul>
                  <li>Unity & C# Game Development</li>
                  <li>React & TypeScript</li>
                  <li>Web Development</li>
                  <li>Git & Version Control</li>
                  <li>Problem Solving</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="notebook-page">
            <h2>Projects</h2>
            <div className="notebook-content">
              {portfolioData ? (
                <ProjectModelManager projects={portfolioData} />
              ) : (
                <LoadingPage onDataLoaded={handleDataLoaded} />
              )}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="notebook-page">
            <h2>Contact Me</h2>
            <div className="notebook-content">
              <p>
                I'm always interested in hearing about new opportunities and collaborations!
                Feel free to reach out through any of the platforms below.
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <h3>Email</h3>
                  <p>your.email@example.com</p>
                </div>
                <div className="contact-item">
                  <h3>LinkedIn</h3>
                  <p>Connect with me on LinkedIn</p>
                </div>
                <div className="contact-item">
                  <h3>GitHub</h3>
                  <p>Check out my projects on GitHub</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="App">
      {/* Notebook Binding */}
      {/* <div className="notebook-binding"></div> */}

      {/* Page Markers */}
      <div className="page-markers">
        <button
          className={`page-marker ${currentPage === 'about' ? 'active' : ''}`}
          onClick={() => setCurrentPage('about')}
        >
          About Me
        </button>
        <button
          className={`page-marker ${currentPage === 'projects' ? 'active' : ''}`}
          onClick={() => setCurrentPage('projects')}
        >
          Projects
        </button>
        <button
          className={`page-marker ${currentPage === 'contact' ? 'active' : ''}`}
          onClick={() => setCurrentPage('contact')}
        >
          Contact Me
        </button>
      </div>

      {/* Main Content */}
      <div className="notebook-container">
        <div className="notebook-page-wrapper">
          {renderPageContent()}
        </div>
      </div>

      {/* Social Icons */}
      <SocialIconBar links={socialLinks} />

      {/* Profile Section */}
      <ProfileSection profileUrl="https://github.com/JGough98.png" profileAlt="ProfileImage" />
    </div>
  );
}

export default App;