import { GitHubToDevicon, NO_GITHUB_MAPPING_FOUND } from "../../../Data/GithubToDevicon";
import GitHubRepoRequest from "../../../Data/Requests/GitHubRepoRequest";
import getRepoLanguages from "../Raw/GetRepoLanguages";


export interface LanguageDTO
{
    deviconName : string,
    gitHubName : string,
}

async function getRepoDeviconLanguages(
    repoLanguagesRequest : GitHubRepoRequest,
    githubToDevicon : GitHubToDevicon) : Promise<LanguageDTO[]> {
    const langauges = await getRepoLanguages(repoLanguagesRequest);

    return Object
        .entries(langauges)
        .map((x) => ({
            gitHubName: x[0],
            deviconName: githubToDevicon[x[0]] ?? NO_GITHUB_MAPPING_FOUND }));
}

export default getRepoDeviconLanguages; 