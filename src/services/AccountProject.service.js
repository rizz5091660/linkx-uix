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
    return fetch(process.env.REACT_APP_API+"accproject", {
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
    return fetch(process.env.REACT_APP_API+"accproject/account/" + accountId)
    .then((Response) => Response.json());
}