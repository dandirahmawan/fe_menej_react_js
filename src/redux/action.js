import {
    deleteDataNoteAction,
    updateDataModuleBugsAction,
    selectRowModuleAction,
    setDataDocFileAction,
    appendDataDocFileAction,
    deleteDataDocFileAction,
    closeDataBugsAction,
    uncloseDataBugsAction,
    updateDataModuleBugsCloseAction,
    updateDataModuleBugsUncloseAction,
    editBugsAction,
    editNoteAction,
    editProjectAction,
    startDataAction,
    setDataLabelAction,
    setDataLabelModuleAction, 
    setAssignedModulesAction, 
    updataDataChecklistAction, 
    setDataStatuAction, 
    setVIewModuleAction,
    setDataTeamAction
} from './type_action'

export function setDataProject(data){
    return{
        type: 'SET_DATA_PROJECT',
        dataProject : data
    }
}

export function renameDataProject(param, data){
    return{
        type: 'RENAME_PROJECT',
        param: param,
        data: data
    }
}

export function setTitleHader(title){
    return{
        type: "SET_TITLE_HEADER",
        title: title
    }
}

export function deleteProject(param){
    return{
        type: 'DELETE_PROJECT',
        param: param
    }
}

export function setDataModule(data){
    return{
        type: "SET_DATA_MODULE",
        data: data
    }
}

export function updateDataModuleBugs(moduleId, typeUpdate){
    return{
        type: updateDataModuleBugsAction,
        moduleId: moduleId,
        typeUpdate: typeUpdate
    }
}

export function updateDataModuleDocFile(moduleId, typeUpdate){
    return{
        type: "UPDATE_DATA_MODULE_DOCUMENT_FILE",
        moduleId: moduleId,
        typeUpdate: typeUpdate
    }
}

export function updateDataModule(moduleId, moduleName, moduleStatus, userId, userName, emailUser, descriptionModule, dueDate){
    return{
        type: "UPDATE_DATA_MODULE",
        moduleId : moduleId, 
        moduleName : moduleName, 
        moduleStatus: moduleStatus, 
        userId: userId,  
        userName: userName, 
        emailUser: emailUser, 
        descriptionModule: descriptionModule, 
        dueDate: dueDate
    }
}

export function startData(jsonData){
    return{
        type : startDataAction,
        jsonData : jsonData
    }
}

export function deleteDataModule(moduleId){
    return{
        type: 'DELETE_DATA_MODULE',
        modulId: moduleId
    }
}

export function deleteMember(userId){
    return{
        type: 'DELETE_MEMBER',
        userId: userId
    }
}

export function setDataNote(dataNote){
    return{
        type: 'SET_DATA_NOTE',
        dataNote: dataNote
    }
}

export function appendDataNote(jsonObject, bugsId, moduleId){
    return{
        type: 'APPEND_DATA_NOTE',
        jsonObject: jsonObject,
        bugsId: bugsId,
        moduleId: moduleId
    }
}

export function setDataBugs(jsonDataBugs){
    return{
        type: 'SET_DATA_BUGS',
        jsonDataBugs: jsonDataBugs
    }
}

export function appendDataBugs(jsonDataBugs){
    return{
        type: 'APPEND_DATA_BUGS',
        jsonDataBugs: jsonDataBugs
    }
}

export function deleteDataBugs(bugsId){
    return{
        type: 'DELETE_DATA_BUGS',
        bugsId: bugsId
    }
}

export function closeDataBugs(bugsId){
    return{
        type: closeDataBugsAction,
        bugsId: bugsId
    }
}

export function uncloseDataBugs(bugsId){
    return{
        type: uncloseDataBugsAction,
        bugsId: bugsId
    }
}

export function updateDataModuleNote(moduleId, typeUpdate){
    return{
        type: 'UPDATE_DATA_MODULE_NOTE',
        moduleId: moduleId,
        typeUpdate: typeUpdate
    }
}

export function selectRowModule(moduleId){
    return{
        type: selectRowModuleAction,
        moduleId: moduleId
    }
}

export function deleteDataNote(noteId){
    return{
        type: deleteDataNoteAction,
        noteId: noteId
    }
}

export function setDataDocFile(jsonArray){
    return{
        type: setDataDocFileAction,
        dataDocFle: jsonArray
    }
}

export function appendDataDocFile(jsonObject){
    return{
        type: appendDataDocFileAction,
        jsonObject: jsonObject
    }
}

export function deleteDataDocFile(moduleId, projectId, fileName, userId){
    return{
        type: deleteDataDocFileAction,
        moduleId: moduleId,
        projectId: projectId,
        fileName: fileName,
        userId: userId
    }
}

export function updateDataChecklist(dataChecklist, moduleId){
    return{
        type: updataDataChecklistAction,
        moduleId: moduleId,
        data: dataChecklist
    }
}

export function updateDataModuleBugsClose(moduleId){
    return{
        type: updateDataModuleBugsCloseAction,
        moduleId: moduleId
    }
}

export function updateDataModuleBugsUnclose(moduleId) {
    return{
        type: updateDataModuleBugsUncloseAction,
        moduleId: moduleId
    }
}

export function editBugs(bugsId, bugs){
    return{
        type: editBugsAction,
        bugsId: bugsId,
        bugs: bugs
    }
}

export function editNote(noteId, note){
    return{
        type: editNoteAction,
        noteId: noteId,
        note: note
    }
}

export function editProject(jsonData){
    return{
        type: editProjectAction,
        jsonData: jsonData
    }
}

export function setDataLabel(data){
    return{
        type: setDataLabelAction,
        data: data
    }
}

export function setDataLabelModule(data){
    return{
        type: setDataLabelModuleAction,
        data: data
    }
}

export function setAssignedModules(data){
    return{
        type: setAssignedModulesAction,
        data: data
    }
}

export function setDataStatus(data){
    return{
        type: setDataStatuAction,
        data: data
    }
}

export function setViewModule(type){
    return{
        type: setVIewModuleAction,
        data: type
    }
}

export function setDataTeam(data){
    return{
        type: setDataTeamAction,
        data: data
    }
}