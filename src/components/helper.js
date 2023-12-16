export default class Helper {

    static validEmail(email) {
        var isCheckEmail = new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/
        );
        if (isCheckEmail.test(email)) {
            return true;
        }
        return false;
    }

    static isValidphone(phone) {
        const regMobile = /^[6-9]\d{9}$/gi;
        if (regMobile.test(phone)) {
            return true;
        }
        return false;
        
    }
} 
