class FormHandler {

    constructor(selector) {
        this.$formElement = $(selector);
    }

    addHandler(dataFn) {
        this.$formElement.on('submit', event => {
            event.preventDefault();

            const dataObj = this.$formElement.serializeArray().reduce((res, obj) => {
                res[obj.name] = obj.value;
                return res;
            }, {});

            const message = dataFn(dataObj);
            if (message) {
                alert(message);
            } else {
                event.target.reset();
            }
        });
    }
}