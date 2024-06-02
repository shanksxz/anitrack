import { userMediaListQuery } from "@/query/medialist/index.ts";
import { updateQuery, searchQuery } from "../query/index.ts";
import { currentUserQuery } from "../query/viewer/index.ts";
import {
    searchAnimeVariable,
    updateAnimeVariable,
    MediaType,
    userMediaListQueryResponse,
    searhAnimeQueryResponse,
    updateAnimeResponse
} from "../types/index.ts";

export default class AniList {
    private static readonly BASE_URL = "https://graphql.anilist.co";
    private static readonly HEADERS = {
        "Content-Type": "application/json",
        Accept: "application/json",
    };

    private static getAccessToken() {
            return localStorage.getItem("accessToken");
    }

    private static async fetchGraphQL(query: string, variables?: Record<string, any>) {
        const accessToken = this.getAccessToken();
        const headers = accessToken ? { ...this.HEADERS, Authorization: `Bearer ${accessToken}` } : this.HEADERS;

        const response = await fetch(this.BASE_URL, {
            method: "POST",
            headers,
            body: JSON.stringify({ query, variables }),
        });

        if (!response.ok) {
            throw new Error("Error in fetching data");
        }

        const data = await response.json();
        if (data.errors) {
            throw new Error(data.errors[0].message);
        }

        return data.data;
    }

    public static async searchMedia({
        search: input,
        mediaType,
    }: searchAnimeVariable) : Promise<searhAnimeQueryResponse> {
        return this.fetchGraphQL(searchQuery, {
            search: input,
            type: mediaType,
        });
    }

    public static async updateMedia(variables: updateAnimeVariable) : Promise<updateAnimeResponse> {
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
    ) : Promise<userMediaListQueryResponse> {
        return this.fetchGraphQL(userMediaListQuery, {
            userId,
            status,
            sort,
            type,
        });
    }
}   


