const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/account"
});

async function userLogin({ name = 'John', pass = '123' }) {
    alert("indise")
    return await pubRoot.post(`/create`, {
        data: { name, pass }
    })
}


(async () => {
    await userLogin({
        name: "haocccc",
        pass: "435"
    });

})();


  // // async function createUser({ name = 'hello', password = 'dd' }) {
// //     // alert("yes")
// //     return await pubRoot.post(`/create`, {
// //         data: {
// //             "name": name,
// //             "pass": password,
// //             "data": {
// //                 "role": 2,
// //                 "description": "Lazy..."
// //             }
// //         }
// //     })
// // }

// async function createUser({ name = 'John', password = 'yan123' }) {
//     return await pubRoot.post(`/create`, {
//         data: { name, password }
//     })
// }

// (async () => {
//     await createUser({
//         name: "yan",
//         password: "pass3456"
//     });
// }
// )();

// (async () => {
//     await createUser({
//         name: "chris",
//         password: "yes"
//     });

//     // let { data } = await getAllAuthors();
//     // console.log(data)
// })();

