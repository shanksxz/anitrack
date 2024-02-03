import { userMediaListQuery } from '@/query/medialist/index.ts'
import {
    updateQuery,
    searchQuery
} from '../query/index.ts'

import {
    currentUserQuery,
} from '../query/viewer/index.ts'

import {
    searchAnimeVariable,
    updateAnimeVariable,
    // updateAnimeResponse, // to remove/type promise<any>
    // searchAnimeResponse, // to remove/type promise<any>
} from '../types/index.ts'


export const searchAnime = async({search : input, mediaType} : searchAnimeVariable) => {
    try {
        const respose = await fetch('https://graphql.anilist.co', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
            body : JSON.stringify({
                query : searchQuery,
                variables : {
                    search : input,
                    type : mediaType
                }
            })
        })   
        
        const data = await respose.json()
        return data;
    } catch (error) {
        throw new Error("Error in Searching Anime")
    }
}

export const updateMedia = async(variables : updateAnimeVariable) => {

    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await fetch('https://graphql.anilist.co', {
            method : 'POST',
            headers : {
                'Authorization' : `Bearer ${accessToken}`,
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
            body : JSON.stringify({
                query : updateQuery,
                variables
            })
        })

        const data = await response.json()
        console.log("Checking ",data)
        return data.data;
    } catch (error) {
        throw new Error("Error in Updating Anime")
    }

}

export const userDetails = async() => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await fetch('https://graphql.anilist.co', {
            method : 'POST',
            headers : {
                'Authorization' : `Bearer ${accessToken}`,
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
            body : JSON.stringify({
                query : currentUserQuery,
            })
        })

        const data = await response.json()
        return data.data;
    } catch (error) {
        throw new Error("Error in Updating Anime")
    }
};



export const userMediaList = async(userId : number, status : string, sort : string, type : 'ANIME' | 'MANGA') => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await fetch('https://graphql.anilist.co', {
            method : 'POST',
            headers : {
                'Authorization' : `Bearer ${accessToken}`,
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
            body : JSON.stringify({
                query : userMediaListQuery,
                variables : {
                    userId,
                    status,
                    sort,
                    type
                }
            })
        })

        console.log("Checking ",userId, status, sort, type)
        const data = await response.json()

        console.log("Checking ",data)
        return data.data;
    } catch (error) {
        console.log(error)
        throw new Error("Error in Updating Anime")
    }
}