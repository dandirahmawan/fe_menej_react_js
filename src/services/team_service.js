import React from "react";
import Fetch from '../function/fetchApi'

export default class team_service {
    delete = async (projectId, userId) => {
        let f = new Fetch()
        let resp = await f.deleteGolang("/member/"+projectId+"/"+userId)
        return resp
    }

    invite = async (body) => {
        let f = new Fetch()
        let resp = await f.postGolang("/invite", body)
        return resp
    }

    getInvitation = async (id) => {
        let f = new Fetch()
        let resp = await f.getGolang("/invitation/"+id)
        return resp
    }
}