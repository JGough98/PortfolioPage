import getRepoProjects, { ProjectRepoRequest } from "../Raw/GetRepoProjects";
import getRepoReadMe from "../Raw/GetRepoReadMe";


export interface ProjectRepoDTO {
    name: string;
    description: string;
    url: string;
    docURL?: string;
    images?: string[];
    videos?: string[];
}


export const getRepos = async (repoRequest: ProjectRepoRequest): Promise<ProjectRepoDTO[]> => {
    var repoProjects = await getRepoProjects(repoRequest);
    
    for (let repo of repoProjects.GitHubRepo) {
        if (repo.description === "") {
            try {
                const readMeData = await getRepoReadMe({username: repoProjects.UserName, repoName: repo.name});
                repo.description = readMeData.description;
            } catch (error) {
                console.error(`Failed to fetch README for ${repo.name}:`, error);
                repo.description = "NA";
            }
        }
    }

    return repoProjects.GitHubRepo.map(repo => ({
        name: repo.name,
        description: repo.description,
        url: repo.url,
        docURL: repo.documentationURL,
        images: repo.images,
        videos: repo.videos
    }));
};

export default getRepos;