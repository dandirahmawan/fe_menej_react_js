import React from 'react'
import Fetch from '../function/fetchApi'

let fetch = new Fetch()
export default class module_service {
    getDataModule = async (projectId) => {
        let resp = await fetch.getGolang("/module/data/"+projectId)
        return resp
    }

    getDataModuleDetail = async (modulid) => {
        let resp = await fetch.getGolang("/module/detail/"+modulid)
        return resp
    }

    getModuleAssigning = async (projectId) => {
        let resp = [] 
        resp = fetch.getGolang("/module/assigning/"+projectId)
        return resp
    }
}
