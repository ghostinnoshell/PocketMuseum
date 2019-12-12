$(function() {

    let userName = localStorage.getItem('current');
    // alert(userName);
    $('#userName').replaceWith(`<div id = "userName">${userName}</div>`);
    $('#name').replaceWith(`<div id = "name">${userName}</div>`);
    eventHandler();
});

function updateInfo() {
    let newPhoneNumber = document.getElementById("phoneNumber").value;
    let newEmail = document.getElementById("email").value;
    // alert(newPhoneNumber);
    alert(newEmail);
    let userName = localStorage.getItem('current');
    let jwt = localStorage.getItem(`${userName}`);
    let content = {
        "phone": newPhoneNumber,
        "email": newEmail,
    };
    async function personalInfo() {
        const response = await axios({
            method: 'post',
            url: `http://localhost:3000/user/${userName}`,
            data: {
                "data": content
            },
            headers: { Authorization: `${jwt}` },
        });
        return response;
    }
    personalInfo();


}


function eventHandler() {

    $('.field').on('click', '.button', function(e) {
        e.preventDefault();
        updateInfo();
    });
}