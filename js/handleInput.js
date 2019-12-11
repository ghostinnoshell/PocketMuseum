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
                "description": "A new user"
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
        let response = createAccount();
        alert(`${response}`);

    }

}
/**
 * This function 
 */
export function getLoginInfo() {
    //select input username
    let userName = $("input.userName[type=userName]").val();
    let passwd = $("input.passWord[type=password]").val();
    alert(`${userName}`);
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