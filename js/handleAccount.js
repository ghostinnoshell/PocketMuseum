/**
 * handle take input from the signup page
 */

$(function () {
    eventHandler();
});
/**
 * This function is used to get user name and password
 */
function getSignupInfo() {

    let userName = $("input.input[type=userName]").val();
    let email = $("input.input[type=email]").val();
    let passwd = $("input.input[type=password]").val();
    let confirmPw = $("#confirm").val();
    if (passwd !== confirmPw) {
        alert(`Two passwords doesn't match`);
    } else {
        let content = {
            "name": userName,
            "pass": passwd,
            "data": {
                "description": email
            }
        };

        // async function getUsers() {
        //     const response = await axios({
        //         method: 'get',
        //         url: `http://localhost:3000/account/create`,
        //     });
        //     return response.status;
        // }


        async function createAccount() {
            const response = await axios({
                method: 'post',
                url: `http://localhost:3000/account/create`,
                data: content,
            });
            return response.status;
        }

        createAccount().then(function (status) {
            // alert(status);
            if (status == 200) {
                window.location.replace("login.html");
            } else {
                alert("Something goes wrong!");
                location.reload();
            }
        });

    }
}


/**
 * This function handle log in 
 */
function getLoginInfo() {
    //select input username
    let userName = $("input.userName[type=userName]").val();
    let passwd = $("input.passWord[type=password]").val();
    let content = {
        "name": userName,
        "pass": passwd,
    }

    localStorage.setItem('current', `${userName}`);
    async function LoginAccount() {
        const response = await axios({
            method: 'post',
            url: `http://localhost:3000/account/login`,
            data: content,
        });
        return response;
    }
    LoginAccount().then(function (response) {
        let jwtToken = response.data.jwt;
        localStorage.setItem(`${userName}`, `Bearer ${jwtToken}`);
        try {
            if (response.status == 200) {
                // alert(`Successfully Logged in`);
                window.location.replace("myCenter.html");

            }
        } catch (err) {
            alert(err.message);
        }
    });

}


function eventHandler() {
    let $rootLogin = $(`.rootLogin`);
    $rootLogin.on('click', '.button', function (e) {
        e.preventDefault();
        getLoginInfo();
    });

    let $rootSignUp = $(`.rootSignUp`);
    $rootSignUp.on('click', '.button', function (e) {
        e.preventDefault();
        getSignupInfo();
    });
}