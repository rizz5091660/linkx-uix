export const ProjectService ={
    search,
    getDetail,
    apply,
    add
}

function search(keyword,location,offset) {
    console.log(location);
    const SearchCriteria ={
        keyword:keyword,
        location:location,
        offset:offset
    }
    return fetch(process.env.REACT_APP_API+"project/criteria", {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(SearchCriteria)
    }).then((Response) => Response.json());
}

function getDetail(id){
    return fetch(process.env.REACT_APP_API+"project/" + id)
    .then((Response) => Response.json())
}

function apply(id,accountId){
   return fetch(process.env.REACT_APP_API+'projectacc', {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({prjId:id, accId:accountId})
    }).then((res) => res.json());
}

function add(name,collabType, startDate, endDate, statesValue, description, skillValue, sponsorValue, accountId, organizationId,offerCategory){
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
        organizationId:organizationId,
        offerCategory:offerCategory

    };
    return fetch(process.env.REACT_APP_API+'project', {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(Project)
    }).then((res) => res.json());
}