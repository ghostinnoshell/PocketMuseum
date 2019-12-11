// import axios from 'axios';

const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
});

async function createAuthor({ first = 'Jojo', last = 'Doe', numBooks = 0 }) {
    return await pubRoot.post(`/authors/`, {
        data: { first, last, numBooks }
    })
}

// async function getAllAuthors() {
//     return await pubRoot.get('/authors');
// }

// (async () => {
//     await createAuthor({
//         first: "joshua",
//         numBooks: 4
//     });

//     // let { data } = await getAllAuthors();
//     // console.log(data)
// })();
