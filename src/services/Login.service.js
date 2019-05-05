export const LoginService ={
    login
}

function login(pUsername,pPassowrd){
    const formLogin = {
        username: pUsername,
        password: pPassowrd
      };
    return   fetch(process.env.REACT_APP_API+"login/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(formLogin)
      })
      .then(response => response.json());

}