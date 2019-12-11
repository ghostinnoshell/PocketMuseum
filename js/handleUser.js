$(function () {
    eventHandler();
});

export function getSignupInfo() {

    // let userName = $("input.input[type=userName]").val();
    // let email = $("input.input[type=email]").val();
    // let passwd = $("input.input[type=password]").val();
    // let confirmPw = $("#confirm").val();
    // if (passwd !== confirmPw) {
    //     alert(`Two passwords doesn't match`);
    // } else {
    let content = {
        "address": "1700 Baity hill",
        "email": "123@yahoo.com",
        // "email": email,
    };
    async function createInfo() {
        const response = await axios({
            method: 'post',
            url: `http://localhost:3000/account/user/`,
            data: content,
        });
        return response.status;
    }
    let response = createInfo();
    // alert(`${response}`);

    // }

}


export function eventHandler() {
    getSignupInfo();
}