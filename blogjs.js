$(function() {
    load();
});


async function post() {
    // alert("ya");
    let postContent = document.getElementById("postContent").value;
    alert(postContent);
}

function load() {
    const $root = $('.box');
    $root.on("click", '#post', post);
};