import React from 'react'
import Fetch from '../function/fetchApi'
import { getCookieSessionId, getCookieUserId } from '../function/function'

let fetch = new Fetch()
export default class project_service {

    get_all_project = async () => {
        let resp = await fetch.getGolang("/project/list")
        return resp
    }

    postProject = async (body) => {
        let resp = await fetch.postGolang("/project", body)
        return resp
    }

}