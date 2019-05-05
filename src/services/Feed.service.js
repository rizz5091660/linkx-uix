
export const FeedService= {
    showFeed,
    showLikes,
    showComment
}

function showFeed(accountId){
    return fetch(process.env.REACT_APP_API+"post/account/"+accountId+"/follow")
    .then((Response) => Response.json())
}

function showLikes(pPostId) {
    return fetch(process.env.REACT_APP_API+"post/" + pPostId + "/like")
    .then((Response) => Response.json())
  }

function showComment(feed, idx){
   return fetch(process.env.REACT_APP_API+"post/" + feed.id + "/comment")
    .then((Response) => Response.json())
}