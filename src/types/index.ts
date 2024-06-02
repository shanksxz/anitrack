//? any better way to handle types? 

export type MediaType = "ANIME" | "MANGA";

export type searchAnimeVariable = {
    search?: string;
    mediaType: MediaType;
    mediaId?: number;
};

export type mediaStatus =
    | "CURRENT"
    | "PLANNING"
    | "COMPLETED"
    | "DROPPED"
    | "PAUSED"
    | "REPEATING";

export type updateAnimeVariable = {
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

export type loginInput = {
    accessToken: string;
};

export type storeState = {
    accessToken: string | null;
    setAccessToken: (token: string) => void;
};

export type uiState = {
    currentTab: string;
    setCurrentTab: (tab: string) => void;
};

export type userState = {
    userId: number;
    userName: string;
    setUserId: (id: number) => void;
    setUserName: (name: string) => void;
};

export type searchMediaResponse = {
    id: number;
    title: {
        romaji: string;
        english: string;
        native: string;
        userPreferred : string;
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

export type NavProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

export type statusDistribution = {
    status: mediaStatus;
    amount: number;
};

export type scoreDistribution = {
    score: number;
    amount: number;
};

export type animeDataType = {
    title: string;
    bannerImage: string;
    coverImage: string;
    description: string;
    stats: {
        statusDistribution: statusDistribution[];
        scoreDistribution: scoreDistribution[];
    };
};

export type ModalProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

export type ModalDetailProps = {
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
};

export type updateAnimeResponse = {
    SaveMediaListEntry: {
        media: {
            title: {
                romaji: string;
                english: string;
                native: string;
            };
            bannerImage: string;
            description: string;
            stats : {
                statusDistribution: {
                    status: mediaStatus;
                    amount: number;
                }[];
                scoreDistribution: {
                    score: number;
                    amount: number;
                }[];
            }
            coverImage: {
                medium: string;
            }
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

export type Avatar = {
    large: string;
    medium: string;
};

export type AnimeStatistics = {
    count: number;
    meanScore: number;
    standardDeviation: number;
    minutesWatched: number;
    episodesWatched: number;
};

export type MangaStatistics = {
    count: number;
    meanScore: number;
    standardDeviation: number;
    chaptersRead: number;
    volumesRead: number;
};

export type Statistics = {
    anime: AnimeStatistics;
    manga: MangaStatistics;
};

export type ViewerQueryResponse = {
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
export type userMediaListVariable = {
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
    Page : {
        mediaList: userMediaListResponse[];
    }
};


export type searhAnimeQueryResponse = {
    Page: {
        media: searchMediaResponse[];
    };
};


