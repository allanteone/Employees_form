
const formHandler = new FormHandler('#form-orders');
const employees = new Employees();

formHandler.addHandler(function (employee) {
    const result = employees.addEmployee(employee);
    return result ? '' : `Employee with id: ${employee.id} already exists`;

})