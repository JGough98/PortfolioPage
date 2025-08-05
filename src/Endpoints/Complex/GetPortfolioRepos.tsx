import getRepoProjects, { ProjectRepoRequest, ProjectRepoResponse } from "../Raw/GetRepoProjects";
import getRepoReadMe from "../Raw/GetRepoReadMe";
import {GITHUB_TO_DEVICON, GitHubToDevicon, NO_GITHUB_MAPPING_FOUND } from "../../UI/Devicon/GithubToDeviconConstants";
import getRepoDeviconLanguages, { LanguageDTO } from "./GetRepoDeviconLanguages";


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
    const githubToDevicon : GitHubToDevicon = GITHUB_TO_DEVICON;

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
            const deviconLanguages = await getRepoDeviconLanguages(nextRequest, githubToDevicon);            
            const foundLanguages = deviconLanguages.filter(lang => lang.deviconName !== NO_GITHUB_MAPPING_FOUND);

            if(deviconLanguages.length != foundLanguages.length)
            {
                console.warn(`Missing GitHub to Devicon languages: ${deviconLanguages
                    .filter(lang => lang.deviconName === NO_GITHUB_MAPPING_FOUND)
                    .map(lang => lang.gitHubName)
                    .join(', ')}`);
            }
            
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