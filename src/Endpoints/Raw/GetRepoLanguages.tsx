export interface GitHubRepoLanguagesRequest
{
    username: string,
    repoName: string
}

export type LanguageResponse = {
  [language: string]: number;
};

async function getRepoLanguages(repoLanguagesRequest : GitHubRepoLanguagesRequest): Promise<LanguageResponse> {
  const url = `https://api.github.com/repos/${repoLanguagesRequest.username}/${repoLanguagesRequest.repoName}/languages`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const data: LanguageResponse = await response.json();
  
  return data;
}

export default getRepoLanguages; 