const formatterObject = {
    currency(number, options = {}, lang = 'ru') {
        const defaultOptions = {
            style: 'currency',
            currency: 'RUB',
            ...options
        };
        return new Intl.NumberFormat(lang, defaultOptions).format(number);
    },
    number(number, options = {}, leng = 'ru') {
        const defaultOptions = {
            ...options
        };
        return new Intl.NumberFormat(leng, defaultOptions).format(number);
    }
};

export const Formatter = {
    install(app) {
        app.config.globalProperties.$formatter = formatterObject;
    }
}