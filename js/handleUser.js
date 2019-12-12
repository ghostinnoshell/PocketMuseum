$(function () {
    eventHandler();
});

export function getSignupInfo() {


    let content = {
        "address": "1700 Baity hill",
        "email": "123@yahoo.com",
        // "email": email,
    };
    async function createInfo() {
        const response = await axios({
            method: 'post',
            url: `http://localhost:3000/account/`,
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