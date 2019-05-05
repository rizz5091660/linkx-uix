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
    return fetch(process.env.REACT_APP_API+"accountfollow/account",{
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
    return fetch(process.env.REACT_APP_API+"suggestion/"+accountId+"/account")
    .then((Response) => Response.json());
 }

 function organizationSimilarTag(accountId){
    return fetch(process.env.REACT_APP_API+"suggestion/"+accountId+"/organization")
    .then((Response) => Response.json());
 }