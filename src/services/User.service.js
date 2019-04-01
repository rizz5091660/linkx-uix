export const UserService = {
    validate,
    add
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
    return fetch("http://localhost:8080/api/account/create", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(formRegister)
    })
    .then(response => response.json())
}