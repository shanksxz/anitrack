export const currentUserQuery = `
query {
    Viewer {
        id
        name
        avatar {
            large
            medium
        }
        siteUrl
        bannerImage
        statistics {
            anime {
                count
                meanScore
                standardDeviation
                minutesWatched
                episodesWatched
            }
            manga {
                count
                meanScore
                standardDeviation
                chaptersRead
                volumesRead
            }
        }
    }
}
`;
