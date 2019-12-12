$(function () {
    load();
});


async function post(e) {
    let postContent = document.getElementById("postContent").value;
    let userName = localStorage.getItem('current');
    let jwt = localStorage.getItem(`${userName}`);
    // alert(jwt);
    let root = e.target;
    // alert($(root).siblings('table'));

    let content = {
        "content": postContent,
    };
    async function postBlog() {

        const response = await axios({
            method: 'post',
            url: `http://localhost:3000/private/lists/${userName}`,
            // url: `http://localhost:3000/private/${userName}`,
            data: {
                "data": content
            },
            headers: { Authorization: `${jwt}` },
        });
        return response;
    }

    function loadPosts() {
        let box = $('.box');
        let $postCard = $('<div></div>')
        // alert("post");
        async function getBlog() {
            const response = await axios({
                method: 'get',
                url: `http://localhost:3000/private/lists`,
                headers: { Authorization: `${jwt}` },
            });
            return response;
        }
        getBlog().then(function (allPost) {
            lists = allPost.data.result;
            alert(lists.yanli.content);

            for (let i in lists) {
                alert(i);
                alert(lists[i].content);
            }
        });


    }
    postBlog().then(
        function (e) {
            loadPosts();
        }
    );



    //     $(root).replaceWith(
    //         `<div id = "blog"> </div>`
    //     );
    //     $('#blog').append(`<div> ${postContent} </div>`);
    // }

}



function load() {
    const $root = $('.box');
    // $root.on("click", '#post', function (e) {
    //     e.preventDefault();
    //     post(e);
    // });

    $('#post').on("click", function (e) {
        e.preventDefault();
        post(e);
    });
};