import axios from 'axios'

export const fetchDataPost = (url, param) => axios.post(url, param)
    .then(response => {
        let data = response.data
        return data
    }).catch(error => {
        let resp = error.response
        if(resp.status == 401){
        }
    })