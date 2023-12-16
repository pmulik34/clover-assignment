export default class FormHelper {
    static isValidEmail(email) {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email);
    }

    static isValidPhone(phone) {
        const mobileRegex = /^[6-9]\d{9}$/gi;
        return mobileRegex.test(phone);
    }
}
