declare global {
    // store's types
    type uiState = {
        currentTab: string;
        setCurrentTab: (tab: string) => void;
    };

    type userDetail = {
        user: {
            id: number;
            name: string;
        };
        setUser: (user: { id: number; name: string }) => void;
    };

    type storeState = {
        accessToken: string | null;
        setAccessToken: (token: string) => void;
    };

    type MediaType = "ANIME" | "MANGA";

    type searchAnimeVariable = {
        search?: string;
        mediaType: MediaType;
        mediaId?: number;
    };

    type mediaStatus =
        | "CURRENT"
        | "PLANNING"
        | "COMPLETED"
        | "DROPPED"
        | "PAUSED"
        | "REPEATING";

    type updateAnimeVariable = {
        mediaId: number;
        status?: mediaStatus;
        score?: number;
        progress?: number;
        repeat?: number;
        startedAt?: {
            year: number;
            month: number;
            day: number;
        };
        completedAt?: {
            year: number;
            month: number;
            day: number;
        };
    };

    type loginInput = {
        accessToken: string;
    };

    type searchMediaResponse = {
        id: number;
        title: {
            romaji: string;
            english: string;
            native: string;
            userPreferred: string;
        };
        nextAiringEpisode: {
            id: number;
            timeUntilAiring: number;
            airingAt: number;
            episode: number;
        };
        chapters: number;
        type: MediaType;
        averageScore: number;
        description: string;
        episodes: number;
        genres: string[];
        season: string;
        seasonYear: number;
        status: string;
        format: string;
        duration: number;
        startDate: {
            year: number;
            month: number;
            day: number;
        };
        endDate: {
            year: number;
            month: number;
            day: number;
        };
        coverImage: {
            medium: string;
        };
        bannerImage: string;
    };

    type NavProps = {
        isOpen: boolean;
        setIsOpen: (isOpen: boolean) => void;
    };

    type statusDistribution = {
        status: mediaStatus;
        amount: number;
    };

    type scoreDistribution = {
        score: number;
        amount: number;
    };

    type animeDataType = {
        title: string;
        bannerImage: string;
        coverImage: string;
        description: string;
        stats: {
            statusDistribution: statusDistribution[];
            scoreDistribution: scoreDistribution[];
        };
    };

    type ModalProps = {
        isOpen: boolean;
        setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
        mediaId: number;
    };

    type ModalDetailProps = {
        setIsOpen: (isOpen: boolean) => void;
        isOpen: boolean;
    };

    type updateAnimeResponse = {
        SaveMediaListEntry: {
            media: {
                title: {
                    romaji: string;
                    english: string;
                    native: string;
                };
                bannerImage: string;
                description: string;
                stats: {
                    statusDistribution: {
                        status: mediaStatus;
                        amount: number;
                    }[];
                    scoreDistribution: {
                        score: number;
                        amount: number;
                    }[];
                };
                coverImage: {
                    medium: string;
                };
            };
            id: number;
            status: string;
            score: number;
            progress: number;
            repeat: number;
            startedAt: {
                year: number;
                month: number;
                day: number;
            };
            completedAt: {
                year: number;
                month: number;
                day: number;
            };
        };
    };

    /* Viewer */
    type Avatar = {
        large: string;
        medium: string;
    };

    type AnimeStatistics = {
        count: number;
        meanScore: number;
        standardDeviation: number;
        minutesWatched: number;
        episodesWatched: number;
    };

    type MangaStatistics = {
        count: number;
        meanScore: number;
        standardDeviation: number;
        chaptersRead: number;
        volumesRead: number;
    };

    type Statistics = {
        anime: AnimeStatistics;
        manga: MangaStatistics;
    };

    type ViewerQueryResponse = {
        Viewer: {
            id: number;
            siteUrl: string;
            name: string;
            avatar: Avatar;
            bannerImage: string;
            statistics: Statistics;
        };
    };

    /* User Media List */
    type userMediaListVariable = {
        userId: number;
        status: string;
        sort: string;
        type: MediaType;
    };

    export type userMediaListResponse = {
        status: string;
        media: {
            title: {
                romaji: string;
                english: string;
                native: string;
                userPreferred: string;
            };
            coverImage: {
                medium: string;
            };
            nextAiringEpisode: {
                id: number;
                timeUntilAiring: number;
                airingAt: number;
                episode: number;
            };
            type: "ANIME" | "MANGA";
            status: string;
            episodes: number;
            chapters: number;
        };
        progress: number;
        mediaId: number;
        id: number;
        startedAt: {
            year: number;
            month: number;
            day: number;
        };
    };

    export type userMediaListQueryResponse = {
        Page: {
            mediaList: userMediaListResponse[];
        };
    };

    export type searhAnimeQueryResponse = {
        Page: {
            media: searchMediaResponse[];
        };
    };
}

export {};
