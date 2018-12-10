import axios from 'axios'
import { HOST } from '../common/js/config'

export function getSingers () {
    const url = HOST + '/top/artists?limit=100'

    return axios.get(url)
}
export function getSingerDetail (singerID) {
    const url = HOST + `/artists?id=${singerID}`
    
    return axios.get(url) 
}
export function getMusic (musicID) {
    const url = HOST + `/music/url?id=${musicID}`

    return axios.get(url)
}