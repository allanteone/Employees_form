class Employees {

    constructor() {
        this.employees = [];
    }

    addEmployee(employee) {
        if (this.employees.findIndex(function(o) {
            return o.id === employee.id;
        }) !== -1) {
            return false;
        }
        this.employees.push(employee);
        return true;
    }
}