export const MasterDataService ={
    getCountries,
    getStatesByCountryId
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