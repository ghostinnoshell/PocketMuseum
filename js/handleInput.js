/**
 * handle take input from the login page
 */

$(function() {
    eventHandler();
});
/**
 * This function is used to get user name and password
 */
export function getSignupInfo() {

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
            // "email": email,
            "data": {
                "description": email
            }
        };
        async function createAccount() {
            const response = await axios({
                method: 'post',
                url: `http://localhost:3000/account/create`,
                data: content,
            });
            return response.status;
        }
        createAccount().then(function(status) {
            if (status == 200) {
                alert(`Account Successfully Created!`);
                window.location.replace("index.html");
            }
        });

    }

}
/**
 * This function handle log in 
 */
export function getLoginInfo() {
    //select input username
    let userName = $("input.userName[type=userName]").val();
    let passwd = $("input.passWord[type=password]").val();
    let content = {
        "name": userName,
        "pass": passwd,
    }
    async function LoginAccount() {
        const response = await axios({
            method: 'post',
            url: `http://localhost:3000/account/login`,
            data: content,
        });
        return response;
    }
    LoginAccount().then(function(response) {
        let jwtToken = response.jwt;
        if (response.status == 200) {
            alert(`Successfully Loged in`);
            window.location.replace("index.html");
        } else if (response.status == 401) {
            alert(`Please Sign Up First!`);
        }
    });

}



export function eventHandler() {
    let $rootLogin = $(`.rootLogin`);
    $rootLogin.on('click', '.button', function(e) {
        getLoginInfo();
    });

    let $rootSignUp = $(`.rootSignUp`);
    $rootSignUp.on('click', '.button', function(e) {
        getSignupInfo();
    });
}