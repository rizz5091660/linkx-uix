 export const UploadService ={
     upload
 }

 function upload(data){
    return fetch(process.env.REACT_APP_API+'upload', {
        method: 'POST',
        body:data
    }).then((res) => res.json());

 }