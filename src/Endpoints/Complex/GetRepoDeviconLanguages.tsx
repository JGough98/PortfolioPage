import { GitHubToDevicon, NO_GITHUB_MAPPING_FOUND } from "../../UI/Devicon/GithubToDeviconConstants";
import getRepoLanguages, { GitHubRepoLanguagesRequest } from "../Raw/GetRepoLanguages";


export interface LanguageDTO
{
    deviconName : string,
    gitHubName : string,
}

async function getRepoDeviconLanguages(
    repoLanguagesRequest : GitHubRepoLanguagesRequest,
    githubToDevicon : GitHubToDevicon) : Promise<LanguageDTO[]> {
    const langauges = await getRepoLanguages(repoLanguagesRequest);

    return Object
        .entries(langauges)
        .map((x) => ({
            gitHubName: x[0],
            deviconName: githubToDevicon[x[0]] ?? NO_GITHUB_MAPPING_FOUND }));
}

export default getRepoDeviconLanguages; 