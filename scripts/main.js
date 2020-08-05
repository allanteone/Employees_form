
const addFormHandler = new FormHandler('#form-orders');
const randomHandler = new FormHandler('#random-generation')
const employees = new Employees();
const random = new Random();


const removeData = {
    id: 'id',
    removeFn: function(id) {
        employees.removeEmployee(id);
        showStatistics(employees);
    },
    confirmMessage: 'employee with id'
}
const headerKeys = {
    id: 'ID',
    email: 'E-mail address',
    gender: 'Gender',
    name: 'Name',
    salary: 'Salary',
    title: 'Title'
}
const headerSalaryStatistics = {
    minSalary: 'Minimal salary',
    avgSalary: 'Average salary',
    maxSalary: 'Maximal salary',
    totalSalary: 'Total salary'
}
const headerTitleStatistics = {
    title: 'Title',
    count: 'Count'
}

const table = new Table('#table-header-row', '#table-body',
    headerKeys, removeData);

const salaryStatistics = new Table('#salary-statistics-header-row', '#salary-statistics-body',
    headerSalaryStatistics);

const titleStatistics = new Table('#title-statistics-header-row','#title-statistics-body',
    headerTitleStatistics);



addFormHandler.addHandler((employee) => {
    employee['id'] = +employee['id'];
    const result = employees.addEmployee(employee);

    if(result) {
        table.addRow(employee);
        showStatistics(employees);
    }

    return result ? '' : `Employee with id: ${employee.id} already exists`;
})



randomHandler.addHandler((object) => {
    if (+object.countEmployees < 1 || +object.countEmployees > 99) {
        return 'Wrong number of employees';
    }
    if (+object.countIdDigits < 2 || +object.countIdDigits > 4) {
        return 'Wrong number of digits for ID';
    }
    if (+object.maxSalary < +object.minSalary) {
        return 'Maximal value is less then minimal value';
    }

    for (let i = 0; i < +object.countEmployees; i++) {
        const employee = random.createRandomEmployee(object.countIdDigits, +object.minSalary, +object.maxSalary);
        const result = employees.addEmployee(employee);

        if(result) {
            table.addRow(employee);
            showStatistics(employees);
        } else {
            i--;
            continue;
        }
    }
})




const hideAll = () => {
    document.querySelector('.card').hidden = true;
    document.querySelector('.generation-form').hidden = true;
    document.querySelector('.table').hidden = true;
    document.querySelector('.salary-statistics').hidden = true;
    document.querySelector('.title-statistics').hidden = true;
}

const showPage = pageId => {
    hideAll();

    switch (pageId) {
        case 'card' : document.querySelector('.card').hidden = false; break;
        case 'generation-form' : document.querySelector('.generation-form').hidden = false; break;
        case 'table' : document.querySelector('.table').hidden = false; break;
        case 'salary-statistics' : document.querySelector('.salary-statistics').hidden = false; break;
        case 'title-statistics' : document.querySelector('.title-statistics').hidden = false; break;
        default: console.log('wrong showPage()\'s switch');
    }
}