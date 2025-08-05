export interface GitHubReadMeRequest
{
    username: string,
    repoName: string
}

export interface GitHubReadMeDTO
{
    description : string;
}

interface GitHubReadMeResponse
{
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  content: string;
  encoding: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
}


const fetchRepoReadMe = async (gitHubRepoReadMeRequest : GitHubReadMeRequest): Promise<GitHubReadMeResponse> => {
  try {
    const response = await fetch(`https://api.github.com/repos/${gitHubRepoReadMeRequest.username}/${gitHubRepoReadMeRequest.repoName}/readme`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: GitHubReadMeResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching README:', error);
    throw error;
  }
};

// Helper function to decode base64 content
export const decodeBase64 = (base64Content: string): string => {
  try
  {
    return atob(base64Content);
  } catch (error) {
    console.error('Error decoding base64 content:', error);
    return '';
  }
};

const getRepoReadMe = async (gitHubRepoReadMeRequest : GitHubReadMeRequest): Promise<GitHubReadMeDTO> => {
    try
    {
        const repoReadMeFile = await fetchRepoReadMe(gitHubRepoReadMeRequest);
        return { description : decodeBase64(repoReadMeFile.content) };
    } catch (error) {
      throw error;
    }
  };

export default getRepoReadMe;