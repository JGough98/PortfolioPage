export interface ProjectRepoRequest {
    pantryId : string;
  }

interface ProjectRepoResponse {
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


export const GetRepoProjects = async (repoRequest: ProjectRepoRequest): Promise<ProjectRepoResponse> => {
  try {
    const response = await fetch(`https://getpantry.cloud/apiv1/pantry/${repoRequest.pantryId}/basket/GitHubRepo`);
    
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

export default GetRepoProjects;