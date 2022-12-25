import React from 'react'
import Fetch from '../function/fetchApi'

export default class user_services {
    
    register = async (body) => {
        let fetch = new Fetch()
        let resp = await fetch.postGolang("/register", body)
        return resp
    }

}