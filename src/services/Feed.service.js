
export const FeedService= {
    showFeed,
    showLikes,
    showComment
}

function showFeed(accountId){
    return fetch("http://localhost:8080/api/post/account/"+accountId+"/follow")
    .then((Response) => Response.json())
}

function showLikes(pPostId) {
    return fetch("http://localhost:8080/api/post/" + pPostId + "/like")
    .then((Response) => Response.json())
  }

function showComment(feed, idx){
   return fetch("http://localhost:8080/api/post/" + feed.id + "/comment")
    .then((Response) => Response.json())
}