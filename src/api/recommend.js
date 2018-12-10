import axios from 'axios'
import { HOST } from 'common/js/config'

export function getRecommendMusic(){
    const url = HOST + '/personalized/newsong'
    return axios.get(url)
}