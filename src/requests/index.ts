import { userMediaListQuery } from "@/query/medialist/index.ts";
import { updateQuery, searchQuery } from "../query/index.ts";
import { currentUserQuery } from "../query/viewer/index.ts";
import {
    searchAnimeVariable,
    updateAnimeVariable,
    MediaType,
    // userMediaListVariable,
} from "../types/index.ts";

// type Variables = updateAnimeVariable | searchAnimeVariable | userMediaListVariable;

// i maybe be doing blunder here xd
// type Varwhiables = { [key: string]: string | number | boolean } | updateAnimeVariable;
class AnimeService {
    private static readonly BASE_URL = "https://graphql.anilist.co";
    private static readonly HEADERS = {
        "Content-Type": "application/json",
        Accept: "application/json",
    };

    private static getAccessToken() {
        //todo : make this work for production (chrome storage api)
        // if (!import.meta.env.DEV) {
        //     chrome.storage.local.get(["accessToken"]).then((res) => {
        //         return res;
        //     });
        // } else {
            return localStorage.getItem("accessToken");
        // }
    }

    private static async fetchGraphQL(query: string, variables?: any ) {
        //! variables shouldnt be of 'any' type
        //todo fix this
        const response = await fetch(this.BASE_URL, {
            method: "POST",
            headers: {
                ...this.HEADERS,
                Authorization: `Bearer ${this.getAccessToken()}`,
            },
            body: JSON.stringify({ query, variables }),
        });

        if (!response.ok) {
            throw new Error("Error in fetching data");
        }

        const data = await response.json();
        return data.data;
    }

    public static async searchMedia({
        search: input,
        mediaType,
    }: searchAnimeVariable) {
        return this.fetchGraphQL(searchQuery, {
            search: input,
            type: mediaType,
        });
    }

    public static async updateMedia(variables: updateAnimeVariable) {
        return this.fetchGraphQL(updateQuery, variables);
    }

    public static async userDetails() {
        return this.fetchGraphQL(currentUserQuery);
    }

    public static async userMediaList(
        userId: number,
        status: string,
        sort: string,
        type: MediaType
    ) {
        return this.fetchGraphQL(userMediaListQuery, {
            userId,
            status,
            sort,
            type,
        });
    }
}

export default AnimeService;
