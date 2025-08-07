import "./App.css";
import { useState } from "react";
import LoadingPage from "./UI/Models/LoadingPageModel";
import ProjectModelManager from "./UI/Models/Project/ProjectModelManager";
import { ProjectRepoDTO } from "./Scripts/Endpoints/Interpreted/GetPortfolioRepos";
import SocialIconBar from "./UI/Models/SocialIconBar";
import socialLinks from "./Data/Constants/SocialIconLinks";
import ProfileImg from "./UI/Components/ProfileImg";


function App() {
  const [portfolioData, setPortfolioData] = useState<ProjectRepoDTO[] | null>(
    null,
  );

  const handleDataLoaded = (data: ProjectRepoDTO[]) => {
    setPortfolioData(data);
  };

  return (
    <div className="App">
      <SocialIconBar links={socialLinks} />
      <div className="centered-content">
        {portfolioData ? (
          <>
            <h1
              style={{
                textAlign: "center",
                color: "#333",
                marginBottom: "30px",
                fontFamily: "Arial, sans-serif",
              }}
            >
              My Portfolio
            </h1>
            <ProfileImg url="https://github.com/JGough98.png" alt="ProfileImage" />
            <ProjectModelManager projects={portfolioData} />
          </>
        ) : (
          <LoadingPage onDataLoaded={handleDataLoaded} />
        )}
      </div>
    </div>
  );
}

export default App;