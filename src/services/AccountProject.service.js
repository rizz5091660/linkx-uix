export const AccountProjectService ={
    add,
    getAccountProjects 
};

function add(url,clientName,startDate,jobDesc,jobTitle,accountId){
    const AccountProject = {
        url: url,
        clientName: clientName,
        startDateStr: startDate,
        jobDesc: jobDesc,
        jobTitle: jobTitle,
        accountId:accountId
    };
    console.log(AccountProject);
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