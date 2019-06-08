export const PeopleService ={
    search,
    get
}

function search(accountId,keyword, location, offset){
    const SearchCriteria ={
        accountId,keyword,location,offset
    }
    return fetch(process.env.REACT_APP_API+"account/search",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        body:JSON.stringify(SearchCriteria)
    }).then(response => response.json());
}

function get(id){
    return fetch(process.env.REACT_APP_API+"account/"+id)
    .then(response => response.json());
}
