export const UserService = {
    validate,
    add,
    get,
    updateProfileOverview
}
function validate(regFirstName, regLastName, regEmail, regPassword, regConfirmPassword) {
    if (regPassword === regConfirmPassword) {
        return true;
    } else {
        return false;
    }
}
function add(regFirstName, regLastName, regEmail, regPassword) {
    const formRegister = {
        firstName: regFirstName,
        lastName: regLastName,
        email: regEmail,
        password: regPassword
    };
    return fetch(process.env.REACT_APP_API+"account/create", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(formRegister)
    })
    .then(response => response.json())
}

function get(id){
    return  fetch(process.env.REACT_APP_API+"account/" + id,
    {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },  method: "GET",
    })
    .then((Response) => Response.json());
}


function updateProfileOverview(data){
    return fetch(process.env.REACT_APP_API+"account/updateOverview", {
        method: "POST",
        body: data
    })
    .then((Response) => Response.json());
}