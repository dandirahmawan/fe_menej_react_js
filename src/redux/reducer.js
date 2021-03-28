import {
    deleteDataNoteAction,
    selectRowModuleAction,
    updateDataModuleBugsAction,
    setDataDocFileAction,
    appendDataDocFileAction,
    deleteDataDocFileAction,
    closeDataBugsAction,
    uncloseDataBugsAction,
    // updateDataModuleBugsCloseAction,
    // updateDataModuleBugsUncloseAction,
    editBugsAction, editNoteAction,
    editProjectAction,
    startDataAction,
    setDataLabelAction,
    setDataLabelModuleAction,
    setAssignedModulesAction,
    updataDataChecklistAction, 
    setDataStatuAction, 
    setVIewModuleAction,
    setDataTeamAction,
    setSectionModuleAction
} from './type_action'

const initState = {
    dataProject : [],
    dataModule: [],
    dataNote:[],
    dataDocFile:[],
    userLoginData:{},
    title:"",
    dataBugs:[],
    dataTeam:[],
    testing:"",
    dataLabels: [],
    dataLabelsModule: [],
    assignedModules: [],
    dataStatus: [],
    sectionModule: [],
    viewModule: "card"
}

function rootReducer(state = initState, action){
    if(action.type === 'SET_DATA_PROJECT'){
        return{
            ...state,
            dataProject: action.dataProject
        }
    }

    if(action.type === 'SET_DATA_NOTE'){
        return{
            ...state,
            dataNote: action.dataNote
        }
    }

    if(action.type === 'APPEND_DATA_NOTE'){
        const newData = state.dataNote.concat(action.jsonObject)
        const newDataModule = state.dataModule.map(dt => {
            if(dt.modulId == action.modulId){
                dt.countNote = parseInt(dt.countNote) + 1
            }
            return dt
        })

        const newDataBugs = state.dataBugs.map(dt => {
            if(dt.bugsId == action.bugsId){
                dt.countNote = parseInt(dt.countNote) + 1
            }
            return dt
        })

        return{
            ...state,
            dataNote: newData,
            dataModule: newDataModule,
            dataBugs: newDataBugs
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
            ...state,
            dataProject : nd
        }
    }

    if(action.type === 'DELETE_PROJECT'){
        let newData = []
        state.dataProject.map(dt => {
            if(dt.projectId != action.param){
                newData.push(dt)
            }
        })

        return{
            ...state,
            dataProject: newData
        }
    }

    if(action.type === setSectionModuleAction){
        return{
            ...state,
            sectionModule: action.data
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

    if(action.type === setVIewModuleAction){
        return{
            ...state,
            viewModule: action.data
        }
    }

    if(action.type === setDataTeamAction){
        let data = action.data
        return{
            ...state,
            dataTeam: data
        }
    }

    if(action.type === 'DELETE_DATA_MODULE'){
        state.dataModule.map(dt => {
            if(dt.modulId == action.modulId){
                var idx = state.dataModule.indexOf(dt)
                state.dataModule.splice(idx, 1)
            }
        })

        let newDataModule = state.dataModule
        return{
            ...state,
            dataModule: newDataModule
        }
    }

    if(action.type === updateDataModuleBugsAction){
        const dataModule = [...state.dataModule]
        // alert("dandi rahmawan")
        const newData = dataModule.map(dt => {
            if(dt.id == action.sectionId){
                dt.sectionModule.map(dtt => {
                    if(dtt.modulId == action.moduleId){
                        console.log(dtt)
                        if(action.typeUpdate == "add"){
                            dtt.countBugs = parseInt(dtt.countBugs) + 1
                        }else{
                            dtt.countBugs = dtt.countBugs - 1
                        }       
                    }
                })
                
            }
            return dt
        })

        return{
            ...state,
            dataModule: newData
        }
    }

    if(action.type === updataDataChecklistAction){
        /*updating data moudule by moduleId*/
        let moduleId = action.moduleId
        let dataChekclist = action.data

        let closeData = 0
        dataChekclist.map(dt => {
            if(dt.status.toLowerCase() == "c"){
                closeData++
            }
        })

        let newDataModule = state.dataModule.map(dt => {
            if(dt.modulId == moduleId){
                dt.countBugsClose = closeData
                console.log(dt)
            }
            return dt
        })

        return{
            ...state,
            dataModule: newDataModule
        }
    }

     // if(action.type === updateDataModuleBugsCloseAction){
    //     const newData = state.dataModule.map(dt => {
    //         if(dt.modulId == action.moduleId){
    //             dt.countBugsClose = parseInt(dt.countBugsClose) + 1      
    //         }
    //         return dt
    //     })

    //     return{
    //         ...state,
    //         dataModule: newData
    //     }
    // }
    
    // if(action.type === updateDataModuleBugsUncloseAction){
    //     const newData = state.dataModule.map(dt => {
    //         if(dt.modulId == action.moduleId){
    //             dt.countBugsClose = dt.countBugsClose - 1      
    //         }
    //         return dt
    //     })

    //     return{
    //         ...state,
    //         dataModule: newData
    //     }
    // }

    if(action.type === "UPDATE_DATA_MODULE_NOTE"){
        const newData = state.dataModule.map(dt => {
            if(dt.modulId == action.moduleId){
                if(action.typeUpdate === "add"){
                    dt.countNote = parseInt(dt.countNote) + 1 
                }else{
                    dt.countNote = dt.countNote - 1 
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
        let dataModule = [...state.dataModule]
        const newData = dataModule.map(dt => {
            if(dt.id == action.section){
                dt.sectionModule.map(dtt => {
                    if(dtt.modulId == action.moduleId){
                        dtt.modulName = action.moduleName
                        dtt.modulStatus = action.moduleStatus
                        dtt.description = action.descriptionModule
                        dtt.userName = action.userName
                        dtt.endDate = new Date(action.dueDate)   
                        dtt.isMember = (dt.userId != action.userId) ? 1 : dt.isMember 
                        dtt.userId = action.userId
                        dtt.label = action.label
                        return dtt
                    }
                })
            }
            return dt
        })

        return{
            ...state,
            dataModule: newData
        }
    }

    if(action.type === startDataAction){
        return{
            ...state,
            userLoginData : action.jsonData
        }
    }

    if(action.type === 'DELETE_MEMBER'){
        const newData = state.dataModule.map(dt => {
            if(dt.userId == action.userId){
                dt.isMember = 0
            }
            return dt
        })

        return{
            ...state,
            dataModule: newData
        }
    }

    if(action.type === 'SET_DATA_BUGS'){
        return{
            ...state,
            dataBugs: action.jsonDataBugs
        }
    }

    if(action.type === 'APPEND_DATA_BUGS'){
        const newData = state.dataBugs.concat(action.jsonDataBugs)
        return{
            ...state,
            dataBugs: newData
        }
    }

    if(action.type === 'DELETE_DATA_BUGS'){
        const newData = state.dataBugs.map(dt => {
            if(dt.bugsId == action.bugsId){
                dt.isDelete = 'Y'
            }
            return dt
        })

        const newDataNote = state.dataNote.map(dt => {
            if(dt.bugsId == action.bugsId){
                dt.isDelete = "Y"
            }
            return dt
        })

        return{
            ...state,
            dataBugs: newData,
            dataNote: newDataNote
        }
    }

    if(action.type === closeDataBugsAction){
        const newData = state.dataBugs.map(dt => {
            if(dt.bugsId == action.bugsId){
                dt.bugStatus = "C"
            }
            return dt
        })
        
        return{
            ...state,
            dataBugs: newData
        }
    }

    if(action.type === uncloseDataBugsAction){
        const newData = state.dataBugs.map(dt => {
            if(dt.bugsId == action.bugsId){
                dt.bugStatus = "P"
            }
            return dt
        })
        
        return{
            ...state,
            dataBugs: newData
        }
    }

    if(action.type === selectRowModuleAction){
        var newData = state.dataModule
        if(action.moduleId !== 'all mark' && action.moduleId !== 'all unmark'){
            newData = state.dataModule.map(dt => {
                if(dt.modulId == action.moduleId){
                    dt.isSelected = !dt.isSelected
                }
                return dt
            })
        }else{
            newData = state.dataModule.map(dt => {
                if(action.moduleId === 'all mark'){
                    dt.isSelected = true
                }else{
                    dt.isSelected = false
                }
                return dt
            })
        }

        return{
            ...state,
            dataModule: newData
        }
    }

    if(action.type === deleteDataNoteAction){
        const noteId = action.noteId
        var moduleId = ""
        var bugsId = ""
        const newDataNote = state.dataNote.map(dt => {
            if(noteId == dt.noteId){
                dt.isDelete = 'Y'
                moduleId = dt.moduleId
                bugsId = dt.bugsId
            }
            return dt
        })

        const newDataModule = state.dataModule.map(dt => {
            if(dt.modulId == moduleId){
                dt.countNote = dt.countNote - 1
            }
            return dt
        })

        const newDataBugs = state.dataBugs.map(dt => {
            if(bugsId == dt.bugsId){
                dt.countNote = dt.countNote - 1
            }
            return dt
        })

        return{
            ...state,
            dataNote: newDataNote,
            dataModule: newDataModule,
            dataBugs: newDataBugs
        }
    }

    if(action.type === setDataDocFileAction){
        var jsonArray = action.dataDocFle
        return{
            ...state,
            dataDocFile: jsonArray
        }
    }

    if(action.type === appendDataDocFileAction){
        state.dataDocFile.push(action.jsonObject)
        return{
            ...state,
            dataDocFile: state.dataDocFile
        }
    }

    if(action.type === deleteDataDocFileAction){
        const mi = action.moduleId 
        const pi = action.projectId
        const fileName = action.fileName
        const userId = action.userId

        const newData = state.dataDocFile.map(dt => {
            if(mi == dt.modulId && pi == dt.projectId && fileName == dt.fileName && userId == dt.userId){
                dt.isDelete = 'Y'
            }
            return dt
        })

        return{
            ...state,
            dataDocFile: newData
        }
    }

    if(action.type === editBugsAction){
        const newData = state.dataBugs.map(dt => {
            if(action.bugsId == dt.bugsId){
                dt.note = action.bugs
            }
            return dt
        })

        return{
            ...state,
            dataBugs: newData
        }
    }

    if(action.type === editNoteAction){
        const newData = state.dataNote.map(dt => {
            if(action.noteId == dt.noteId){
                dt.note = action.note
            }
            return dt
        })

        return{
            ...state,
            dataNote: newData
        }
    }

    if(action.type === editProjectAction){
        const newData = state.dataProject.map(dt => {
            let projectId = action.jsonData.projectId
            if(projectId == dt.projectId){
                dt = action.jsonData
            }
            return dt
        })

        return{
            ...state,
            dataProject: newData
        }
    }

    if(action.type === setDataLabelAction){
        var jsonArray = action.data
        return{
            ...state,
            dataLabels: jsonArray
        }
    }

    if(action.type === setDataLabelModuleAction){
        var jsonArray = action.data
        return{
            ...state,
            dataLabelsModule: jsonArray
        }
    }

    if(action.type === setAssignedModulesAction){
        var jsonArray = action.data
        return{
            ...state,
            assignedModules: jsonArray
        }
    }

    if(action.type === setDataStatuAction){
        var jsonArray = action.data
        return{
            ...state,
            dataStatus: jsonArray
        }
    }

    return state
}

export default rootReducer