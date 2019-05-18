export const MasterDataService ={
    getCountries,
    getStatesByCountryId,
    getStatesByName,
    getGenericLocationsByName,
    getSponsoredItemsSuggestionByName,
    getSkillsSuggestionByName,
    getOfferCategory
}

function getCountries(){
    return fetch(process.env.REACT_APP_API+"data/countrydd", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "GET"
      })
      .then(response => response.json());
}

function getStatesByName(name){
    return fetch(process.env.REACT_APP_API+"data/states/autocomplete/"+name, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "GET"
      })
      .then(response => response.json());
}

function getStatesByCountryId(countryId){
    return fetch(process.env.REACT_APP_API+"data/states/country/"+countryId,{
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "GET"
    })
    .then(response => response.json());
}  

function getGenericLocationsByName(name){
    return fetch(process.env.REACT_APP_API+"data/generic/location/"+name,{
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "GET"
    })
    .then(response => response.json());
}


function getSponsoredItemsSuggestionByName(name){
    return  fetch(process.env.REACT_APP_API+"data/sponsoreditem/autocomplete/" + name, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "GET"
    })
    .then(response => response.json());
}

function getSkillsSuggestionByName(name){
    return fetch(process.env.REACT_APP_API+"data/skill/autocomplete/" + name, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "GET"
    })
    .then(response => response.json());
}

function getOfferCategory(){
    return fetch(process.env.REACT_APP_API+"data/offercategorydd", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "GET"
      })
      .then(response => response.json());
}