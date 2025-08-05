import GitHubRepoRequest from "../../../Data/Requests/GitHubRepoRequest";

export type LanguageResponse = {
  [language: string]: number;
};

async function getRepoLanguages(
  repoLanguagesRequest: GitHubRepoRequest
): Promise<LanguageResponse> {
  const token = process.env.REACT_APP_GITHUB_TOKEN;
  
  if (!token) {
    throw new Error('GitHub token not found. Please set REACT_APP_GITHUB_TOKEN in your .env file');
  }

  const url = `https://api.github.com/repos/${repoLanguagesRequest.username}/${repoLanguagesRequest.repoName}/languages`;

  const response = await fetch(url, {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const data: LanguageResponse = await response.json();
  return data;
}

export default getRepoLanguages;