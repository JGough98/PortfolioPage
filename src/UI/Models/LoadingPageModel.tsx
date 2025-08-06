import React, { useState, useEffect } from "react";
import {getPortfolioRepos, ProjectRepoDTO} from "../../Scripts/Endpoints/Interpreted/GetPortfolioRepos";
import Button from "../Components/Button";

interface LoadingPageProps {
  retryTime? : number,
  onDataLoaded: (data: ProjectRepoDTO[]) => void;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ onDataLoaded, retryTime = 8 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [countdown, setCountdown] = useState(0);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getPortfolioRepos();
      if (data.length === 0) {
        throw new Error("No portfolio data received");
      }
      onDataLoaded(data);
    } catch (err) {
      const errorMessage = err instanceof Error
        ? err.message
        : "Failed to load portfolio data";
      setError(errorMessage);
      setIsLoading(false);

      // Start countdown for retry
      setCountdown(retryTime);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => { setCountdown(countdown - 1); }, retryTime * 100);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && error) {
      // Auto-retry after countdown reaches 0
      setRetryCount((prev) => prev + 1);
      fetchData();
    }
  }, [countdown]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    fetchData();
  };

  if (isLoading && !error) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "4px solid #e3e3e3",
            borderTop: "4px solid #3498db",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            marginBottom: "20px",
          }}
        ></div>
        <h2 style={{ color: "#333", marginBottom: "10px" }}>
          Loading Portfolio...
        </h2>
        <p style={{ color: "#666" }}>Fetching your projects from GitHub</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          fontFamily: "Arial, sans-serif",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#ff6b6b",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <span style={{ color: "white", fontSize: "40px" }}>!</span>
        </div>
        <h2
          style={{ color: "#333", marginBottom: "10px", textAlign: "center" }}
        >
          Failed to Load Portfolio
        </h2>
        <p
          style={{
            color: "#666",
            textAlign: "center",
            maxWidth: "500px",
            marginBottom: "20px",
          }}
        >
          {error}
        </p>
        <div style={{ textAlign: "center" }}>
          {countdown > 0 ? (
            <p style={{ color: "#666", marginBottom: "15px" }}>
              Retrying automatically in {countdown} seconds...
            </p>
          ) : (
            <p style={{ color: "#666", marginBottom: "15px" }}>
              Attempt {retryCount + 1}
            </p>
          )}
          <Button text="Retry" action = {handleRetry}></Button>
        </div>
      </div>
    );
  }

  return null;
};

export default LoadingPage;