export const ProjectService ={
    search,
    getDetail,
    apply,
    add
}

function search(keyword,location,offset) {
    const SearchCriteria ={
        keyword:keyword,
        location:location,
        offset:offset
    }
    return fetch(process.env.REACT_APP_API+"project/search", {
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

function add(data){
    return fetch(process.env.REACT_APP_API+'project', {
        method: 'POST',
        body:data
    }).then((res) => res.json());
}