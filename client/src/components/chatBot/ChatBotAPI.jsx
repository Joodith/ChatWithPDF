import axios from 'axios';
const API = {
    // GetChatbotResponse: async message => {
    //     return new Promise(function (resolve, reject) {
    //         setTimeout(function () {
    //             if (message === "hi") resolve("Welcome to chatbot!");
    //             else resolve("echo : " + message);
    //         }, 2000);
    //     });
    // }
    GetChatbotResponse: async(query)=>{
        // const formData = new FormData();
        // formData.append('queryText',query);
        console.log("given query is "+query);
        return axios.post("http://localhost:3002/queryDoc",{query})
        .then(response => {
            console.log(response);
            return response.data.answer;
        })
        .catch(err => {
            console.log(err);
        })
    }
};

export default API;