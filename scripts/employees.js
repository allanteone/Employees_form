class Employees {

    constructor() {
        this.employees = [];
    }

    addEmployee(employee) {
        if (this.employees.findIndex(o => o.id === employee.id) !== -1) {
            return false;
        }
        this.employees.push(employee);
        return true;
    }


    removeEmployee(id) {
        const index = this.employees.findIndex(employee => employee.id === id);

        if (index < 0) {
            return false;
        }
        this.employees.splice(index, 1);
        return true;
    }


    getAllEmployees() {
        return this.employees;
    }
}

