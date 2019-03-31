export const LoginService ={
    login
}

function login(pUsername,pPassowrd){
    const formLogin = {
        username: pUsername,
        password: pPassowrd
      };
    return   fetch("http://localhost:8080/api/login/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(formLogin)
      })
      .then(response => response.json());

}