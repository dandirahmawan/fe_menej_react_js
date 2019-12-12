const initState = {
    dataProject : [],
    dataModule: [],
    popup:"",
    title:""
}

function rootReducer(state = initState, action){
    if(action.type === 'SET_DATA_PROJECT'){
        return{
            ...state,
            dataProject: action.dataProject
        }
    }

    if(action.type === 'RENAME_PROJECT'){
        const nd = state.dataProject.map(dt => {
            if(dt.projectId == action.param){
                dt.projectName = action.data
            }
            return dt
        })

        return{
            dataProject : nd
        }
    }

    if(action.type === 'DELETE_PROJECT'){
        var i = 0
        var index = 0;
        state.dataProject.map(dt => {
            if(dt.projectId == action.param){
                index = i
            }
            i++
        })
        
        state.dataProject.splice(index, 1)
        const newData = state.dataProject.map(dt => {
            return dt
        })
        return{
            dataProject : newData
        }
    }

    if(action.type === 'POPUP_PROFILE'){
        return{
            ...state,
            popup: action.element
        }
    }

    if(action.type === 'POPUP_NOTIFICATION'){
        return{
            ...state,
            popup: action.element
        }
    }
    
    if(action.type === 'SET_TITLE_HEADER'){
        return{
            ...state,
            title: action.title
        }
    }

    if(action.type === 'SET_DATA_MODULE'){
        return{
            ...state,
            dataModule: action.data
        }
    }

    if(action.type === "UPDATE_DATA_MODULE_BUGS"){
        const newData = state.dataModule.map(dt => {
            if(dt.modulId == action.moduleId){
                if(action.typeUpdate == "add"){
                    dt.countBugs = parseInt(dt.countBugs) + 1 
                }else{
                    dt.countBugs = dt.countBugs - 1 
                }       
            }
            return dt
        })

        return{
            ...state,
            dataModule: newData
        }
    }

    if(action.type === "UPDATE_DATA_MODULE_DOCUMENT_FILE"){
        const newData = state.dataModule.map(dt => {
            if(dt.modulId == action.moduleId){
                if(action.typeUpdate == "add"){
                    dt.countDoc = parseInt(dt.countDoc) + 1 
                }else{
                    dt.countDoc = dt.countDoc - 1 
                }       
            }
            return dt
        })

        return{
            ...state,
            dataModule: newData
        }
    }

    if(action.type === "UPDATE_DATA_MODULE"){
        const newData = state.dataModule.map(dt => {
            if(dt.modulId == action.moduleId){
                dt.modulName = action.moduleName
                dt.modulStatus = action.moduleStatus
                dt.userId = action.userId
                dt.description = action.descriptionModule
                dt.userName = action.userName
                dt.endDate = new Date(action.dueDate)    
            }
            return dt
        })

        return{
            ...state,
            dataModule: newData
        }
    }

    return state
}

export default rootReducer