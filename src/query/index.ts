const searchQuery = `
  query ($search: String, $type: MediaType, $id: Int) {
    Page {
      media (search: $search, type: $type, id: $id) {
        id
        title {
          romaji
          english
          native
          userPreferred
        }
        type
        chapters
        nextAiringEpisode {
          id
          timeUntilAiring
          airingAt
          episode
        }
        averageScore
        description
        episodes
        genres
        season
        seasonYear
        genres
        status
        format
        duration
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        coverImage {
          medium
        }
        bannerImage
      }
    }
  }
`;

const updateQuery = `
  mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int, $score: Float, $repeat: Int, $startedAt: FuzzyDateInput, $completedAt: FuzzyDateInput) {
    SaveMediaListEntry(mediaId: $mediaId, status: $status, progress: $progress, score: $score, repeat: $repeat, startedAt: $startedAt, completedAt: $completedAt) {
      id
      status
      score
      progress
      repeat
      startedAt {
        year
        month
        day
      }
      completedAt {
        year
        month
        day
      }
      media{
          title{
            english
            romaji
            native
          }
          coverImage{
            medium
          }
          description
          bannerImage
          siteUrl

        }
    }
  }
`;

export { updateQuery, searchQuery };
