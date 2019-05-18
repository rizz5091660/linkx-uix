 export const UploadService ={
     upload
 }

 function upload(event){
    const data = new FormData();
    let file = event.target.files[0];
    console.log("Uploading file", event.target.files[0]);
    data.append('file', event.target.files[0]);
    //data.append('name', 'my_file');
    data.append('type', 'profile-pict');
    let self = this;
    return fetch(process.env.REACT_APP_API+'upload', {
        method: 'POST',
        headers : {
        },
        body:data
    }).then((res) => res.json());
 }