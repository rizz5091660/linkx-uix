export const MasterDataService ={
    getCountries,
    getStatesByCountryId,
    getStatesByName,
    getGenericLocationsByName,
    getSponsoredItemsSuggestionByName,
    getSkillsSuggestionByName
}

function getCountries(){
    return fetch("http://localhost:8080/api/data/countrydd", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "GET"
      })
      .then(response => response.json());
}

function getStatesByName(name){
    return fetch("http://localhost:8080/api/data/states/autocomplete/"+name, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "GET"
      })
      .then(response => response.json());
}

function getStatesByCountryId(countryId){
    return fetch("http://localhost:8080/api/data/states/country/"+countryId,{
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "GET"
    })
    .then(response => response.json());
}  

function getGenericLocationsByName(name){
    return fetch("http://localhost:8080/api/data/generic/location/"+name,{
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "GET"
    })
    .then(response => response.json());
}


function getSponsoredItemsSuggestionByName(name){
    return  fetch("http://localhost:8080/api/data/sponsoreditem/autocomplete/" + name, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "GET"
    })
    .then(response => response.json());
}

function getSkillsSuggestionByName(name){
    return fetch("http://localhost:8080/api/data/skill/autocomplete/" + name, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "GET"
    })
    .then(response => response.json());
}