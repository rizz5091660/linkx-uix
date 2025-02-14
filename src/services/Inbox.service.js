export const InboxService ={
    addMSg
}

function addMSg(accId, accFriendId, text){
    const chatMessage = {
        id: "",
        accountId: accId,
        accountFriendId: accFriendId,
        type: "text",
        theme: "white",
        text: text,
        statusRead: 0,
        status: 1
      };
    return   fetch(process.env.REACT_APP_API+"chat/msg/add", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(chatMessage)
      })
      .then(response => response.json());

}