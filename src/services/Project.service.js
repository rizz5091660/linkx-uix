export const ProjectService ={
    searchProject,
    getProjectDetail,
    applyProject
}

function searchProject(offset) {
    return fetch("http://localhost:8080/api/project/criteria?offset=" + offset)
    .then((Response) => Response.json())
}

function getProjectDetail(projectId){
    return fetch("http://localhost:8080/api/project/" + projectId)
    .then((Response) => Response.json())
}

function  applyProject(projectId,accountId){
   return fetch('http://localhost:8080/api/projectacc', {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({prjId:projectId, accId:accountId})
    }).then((res) => res.json());
}