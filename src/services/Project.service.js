export const ProjectService ={
    searchProject,
    getProjectDetail,
    applyProject,
    add
}

function searchProject(keyword,location,offset) {
    console.log(location);
    const SearchProjectCriteria ={
        keyword:keyword,
        location:location,
        offset:offset
    }
    return fetch("http://localhost:8080/api/project/criteria", {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(SearchProjectCriteria)
    }).then((Response) => Response.json());
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

function add(name,collabType, startDate, endDate, statesValue, description, skillValue, sponsorValue, accountId, organizationId){
    const Project = {
        name: name,
        collabType: collabType.value,
        startDateStr: startDate,
        endDateStr: endDate,
        location: statesValue,
        description: description,
        skillValue: skillValue,
        sponsorValue:sponsorValue,
        accountId:accountId,
        organizationId:organizationId

    };
    console.log(Project);
    return fetch('http://localhost:8080/api/project', {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(Project)
    }).then((res) => res.json());
}