import axios  from "axios";

export const getUsers=()=>{
    return new Promise((resolve,reject)=>{
        axios 
        .get("http://localhost:4000/users")
        .then(function (response) {
            resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
    })
}