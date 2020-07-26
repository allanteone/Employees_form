
const formHandler = new FormHandler('#form-orders');
const orders = new Orders();

formHandler.addHandler(function (order) {
    const result = orders.addOrder(order);
    return result ? '' : order.email + ' order already exists';
})