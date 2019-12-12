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

export function popupProfile(element){
    return{
        type: "POPUP_PROFILE",
        element: element
    }
}

export function popupNotification(element){
    return{
        type: "POPUP_NOTIFICATION",
        element: element
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
        type: "UPDATE_DATA_MODULE_BUGS",
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