import {baseUrl} from '../const/const'
import {getCookieUserId, getCookieSessionId} from '../function/function'
import FetchDefault from 'fetch-defaults'

export var ApiFetch = FetchDefault(fetch, baseUrl,{
    headers: {
        sessionid: getCookieSessionId(),
        userid: getCookieUserId()
    }
})