import "./App.css";
import { useState } from "react";
import LoadingPage from "./UI/Models/LoadingPageModel";
import ProjectModelManager from "./UI/Models/Project/ProjectModelManager";
import { ProjectRepoDTO } from "./Scripts/Endpoints/Interpreted/GetPortfolioRepos";
import SocialIconBar from "./UI/Models/SocialIconBar";
import socialLinks from "./Data/SocialIconLinks";


function App() {
  const [portfolioData, setPortfolioData] = useState<ProjectRepoDTO[] | null>(
    null,
  );

  const handleDataLoaded = (data: ProjectRepoDTO[]) => {
    setPortfolioData(data);
  };

  return (
    <div className="App">
      {portfolioData ? (
        <div style={{ padding: "20px" }}>
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
          <ProjectModelManager projects={portfolioData} />
          <SocialIconBar links={socialLinks} />
        </div>
      ) : (
        <LoadingPage onDataLoaded={handleDataLoaded} />
      )}
    </div>
  );
}

export default App;