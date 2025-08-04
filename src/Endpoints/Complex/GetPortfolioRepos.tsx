import getRepoLanguages, { LanguageDTO } from "../Raw/GetRepoLanguages";
import getRepoProjects, { ProjectRepoRequest, ProjectRepoResponse } from "../Raw/GetRepoProjects";
import getRepoReadMe from "../Raw/GetRepoReadMe";
import { GITHUB_TO_DEVICON } from "../../Devicon/GithubToDeviconConstants";


export interface ProjectRepoDTO {
    name: string;
    description: string;
    url: string;
    languages: LanguageDTO[],
    docURL?: string;
    images?: string[];
    videos?: string[];
}


// Will attempt to fetch all the Portfolio data needed to render the repo UI.
export const getPortfolioRepos = async (repoRequest: ProjectRepoRequest): Promise<ProjectRepoDTO[]> => {
    var repoProjects : ProjectRepoResponse;
    try
    {
        repoProjects = await getRepoProjects(repoRequest);
    }
    catch (error)
    {
        console.error(`Failed to fetch pantry repos.`, error);
        return [];
    }

    const repos: ProjectRepoDTO[] = new Array(repoProjects.GitHubRepo.length);

    for (var i = 0; i < repoProjects.GitHubRepo.length; i++)
    {
        const nextRequest = {username: repoProjects.UserName, repoName: repoProjects.GitHubRepo[i].name};
        var description = "";

        // Use the read me as a fall back for the description of the repro.
        if (repoProjects.GitHubRepo[i].description === "") {
            try
            {
                description = (await getRepoReadMe(nextRequest)).description;
            }
            catch (error)
            {
                console.error(`Failed to fetch README for ${repoProjects.GitHubRepo[i].name}:`, error);
                description = "NA";
            }
        }
        
        var languages : LanguageDTO[];
        try
        {
            // Add the languages used in the project.
            const githubLanguages = await getRepoLanguages(nextRequest);
            
            const foundLanguages = githubLanguages.filter(lang => 
                Object.keys(GITHUB_TO_DEVICON).includes(lang.name)
            );
            const notFoundLanguages = githubLanguages.filter(lang => 
                !Object.keys(GITHUB_TO_DEVICON).includes(lang.name)
            );

            if(notFoundLanguages.length > 0)
                console.warn(`Missing Devicon languages: ${notFoundLanguages.map(lang => lang.name).join(', ')}`);
            
            // Use only the found languages for now
            languages = foundLanguages;
        }
        catch (error)
        {
            console.error(`Failed to fetch Languages for ${repoProjects.GitHubRepo[i].name}:`, error);
            languages = [];
        }
        
        repos[i] = {
            name: repoProjects.GitHubRepo[i].name,
            description: description,
            url: repoProjects.GitHubRepo[i].url,
            languages : languages,
            docURL: repoProjects.GitHubRepo[i].documentationURL,
            images: repoProjects.GitHubRepo[i].images,
            videos: repoProjects.GitHubRepo[i].videos
        };
    }

    return repos;
};

export default getPortfolioRepos;