export const OfferService ={
    getDetail,
    search,
    add,
    apply
}

function getDetail(id){
    return fetch(process.env.REACT_APP_API+"offer/" + id)
    .then((Response) => Response.json())
}


function search(keyword,location,offset) {
    console.log(location);
    const SearchCriteria ={
        keyword:keyword,
        location:location,
        offset:offset
    }
    return fetch(process.env.REACT_APP_API+"offer/search", {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(SearchCriteria)
    }).then((Response) => Response.json());
}

function apply(id,accountId){
    return fetch(process.env.REACT_APP_API+'offeracc', {
         method: 'POST',
         headers : {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
         },
         body:JSON.stringify({prjId:id, accId:accountId})
     }).then((res) => res.json());
 }

function add(data){
    return fetch(process.env.REACT_APP_API+'offer', {
        method: 'POST',
        body:data
    }).then((res) => res.json());
}