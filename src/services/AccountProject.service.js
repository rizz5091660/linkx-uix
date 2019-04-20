export const AccountProjectService ={
    add,
    getAccountProjects
};

function add(clientName,title,startDate,jobDesc,accountId){
    const AccountProject = {
        clientName: clientName,
        startDateStr: startDate,
        jobDesc: jobDesc,
        title: title,
        accountId:accountId
    };
    return fetch("http://localhost:8080/api/accproject", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(AccountProject)
    })
    .then(response => response.json())
}

function getAccountProjects(accountId){
    return fetch("http://localhost:8080/api/accproject/account/" + accountId)
    .then((Response) => Response.json());
}