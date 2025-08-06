export interface ProjectRepoResponse {
  UserName: string;
  GitHubRepo: {
    id: number;
    name: string;
    description: string;
    url: string;
    documentationURL: string;
    images: string[];
    videos: string[];
  }[];
}


export const getRepoProjects = async (): Promise<ProjectRepoResponse> => {
  const token = process.env.REACT_APP_PANTRY_TOKEN;

  if (!token) {
    throw new Error('Pantry token not found. Please set REACT_APP_PANTRY_TOKEN in your .env file');
  }

  try {
    const response = await fetch(`https://getpantry.cloud/apiv1/pantry/${token}/basket/GitHubRepo`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ProjectRepoResponse = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching Pantry projects:', error);
    return { UserName: "", GitHubRepo: [] };
  }
};

export default getRepoProjects;