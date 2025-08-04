export interface GitHubRepoLanguagesRequest
{
    username: string,
    repoName: string
}

export interface LanguageDTO
{
    name : string,
    byteCode : number,
}

type LanguageResponse = {
  [language: string]: number; // Language name as key, bytes as value
};

async function getRepoLanguages(repoLanguagesRequest : GitHubRepoLanguagesRequest): Promise<LanguageDTO[]> {
  const url = `https://api.github.com/repos/${repoLanguagesRequest.username}/${repoLanguagesRequest.repoName}/languages`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const data: LanguageResponse = await response.json();
  return Object.entries(data).map((x) => ({ name: x[0], byteCode: x[1] }));
}
