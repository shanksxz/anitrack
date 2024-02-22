export const userMediaListQuery = `
  query ($userId: Int, $status : MediaListStatus, $sort : [MediaListSort], $type : MediaType) {
    Page {
      mediaList(userId : $userId, status : $status, sort : $sort, type : $type) {
        status
        media {
          title {
            romaji
            english
            native
            userPreferred
          }

          coverImage {
            medium
          }

          type

          nextAiringEpisode {
            id
            timeUntilAiring
            airingAt
            episode
          }

          status
          episodes
          chapters

        }
        progress
        mediaId
        id
        startedAt {
          year
          month
          day
        }
      }
    }
  }
`;
