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


    removeEmployee(id) {
        const index = this.employees.findIndex(function (employee) {
            return employee.id === id;
        });

        if (index < 0) {
            return false;
        }
        this.employees.splice(index, 1);
        return true;
    }
}