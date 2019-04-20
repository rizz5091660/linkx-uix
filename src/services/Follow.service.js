 export const FollowService={
     followAccount,
     accountSimilarTag,
     organizationSimilarTag
 }

 function followAccount(accountId,accountFollowId){
    const AccountFollowAccount ={
        accountId :accountId,
        friendId:accountFollowId
    }
    return fetch("http://localhost:8080/api/accountfollow/account",{
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(AccountFollowAccount)
    })
    .then(response => response.json());
 }

 function accountSimilarTag(accountId){
    return fetch("http://localhost:8080/api/suggestion/"+accountId+"/account")
    .then((Response) => Response.json());
 }

 function organizationSimilarTag(accountId){
    return fetch("http://localhost:8080/api/suggestion/"+accountId+"/organization")
    .then((Response) => Response.json());
 }