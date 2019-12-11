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
        // let response = createAccount();
        // alert(`${response}`);
        createAccount().then(function(status) {
            alert(status)
            if (status == 200) {
                alert(`Account Successfully Created!`);
                window.location.replace("index.html");
            } else {
                alert("Something goes wrong!");
                location.reload();
            }
        });

    }

}
// async function createAccount() {
//     const response = await axios({
//         method: 'post',
//         url: `http://localhost:3000/account/create`,
//         data: content,
//     });
//     return response.status;
// }
// let response = createAccount();
// alert(`${response}`);

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
    alert("login page");
    async function LoginAccount() {
        const response = await axios({
            method: 'post',
            url: `http://localhost:3000/account/login`,
            data: content,
            // headers: { Authorization: `Bearer ${jwt}` }

        });
        return response;
    }
    LoginAccount().then(function(response) {
        let jwtToken = response.data.jwt;
        alert(jwtToken)
        localStorage.setItem(`${userName}`, `Bearer ${jwtToken}`);
        alert(localStorage.getItem(`${userName}`))
        try {
            if (response.status == 200) {
                alert(`Successfully Logged in`);
                //alert(jwtToken)
                //window.location.replace("index.html");
                window.location.replace("myCenter.html");
            }
        } catch (err) {
            alert(err.message);
        }
        // else if (response.status == 401) {
        //     alert(`Cannot verify your account, please try again!`);
        //     location.reload();
        // }
    });

}



export function eventHandler() {
    let $rootLogin = $(`.rootLogin`);
    $rootLogin.on('click', '.button', function(e) {
        e.preventDefault();
        getLoginInfo();
    });

    let $rootSignUp = $(`.rootSignUp`);
    $rootSignUp.on('click', '.button', function(e) {
        e.preventDefault();
        getSignupInfo();
    });
}