
const formHandler = new FormHandler('#form-orders');
const randomHandler = new FormHandler('#random-generation')
const employees = new Employees();
const random = new Random();
const table = new Table('#table-header-row', '#table-body',
    ['id', 'email', 'gender', 'name', 'salary', 'title'], 'id',
    function(id) {
    employees.removeEmployee(id);
    });

const statistics = new Table('#statistics-header-row', '#statistics-body',
    ['minSalary', 'avgSalary', 'maxSalary', 'totalSalary'], 'id');



formHandler.addHandler(function (employee) {
    const result = employees.addEmployee(employee);

    if(result) {
        table.addRow(employee);
    }

    return result ? '' : `Employee with id: ${employee.id} already exists`;
})



randomHandler.addHandler(function(object) {
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
            console.log(i);     //debug
        } else {
            i--;
            continue;
        }
    }
})



function getStatistics(employees) {
    const result = {};

    result.totalSalary = getTotalSalary(employees);
    result.avgSalary = getAvgSalary(employees);
    result.maxSalary = getMaxSalary(employees);
    result.minSalary = getMinSalary(employees);

    return result;
}

function getTotalSalary(employees) {
    return employees.reduce(function (sum, current) {
        return sum + Number(current.salary);
    }, 0);
}

function getAvgSalary(employees) {
    let average = getTotalSalary(employees) / employees.length;

    return Math.round(average * 100) / 100;
}

function getMaxSalary(employees) {
    let maxSalary = 0;

    employees.forEach(function (employee) {
        if (maxSalary < employee.salary) {
            maxSalary = employee.salary;
        }
    });
    return maxSalary;
}

function getMinSalary(employees) {
    let minSalary = getMaxSalary(employees);

    employees.forEach(function (employee) {
        if (minSalary > employee.salary) {
            minSalary = employee.salary
        }
    });
    return minSalary;
}





function hideAll() {
    document.querySelector('.card').hidden = true;
    document.querySelector('.generation-form').hidden = true;
    document.querySelector('.table').hidden = true;
    document.querySelector('.statistics').hidden = true;
}

function showPage(pageId) {
    hideAll();

    switch (pageId) {
        case 'card' : document.querySelector('.card').hidden = false; break;
        case 'generation-form' : document.querySelector('.generation-form').hidden = false; break;
        case 'table' : document.querySelector('.table').hidden = false; break;
        case 'statistics' : {
            document.querySelector('.statistics').hidden = false;
            statistics.$bodyElement.empty();
            statistics.addRow(getStatistics(employees.getAllEmployees()));
        } break;
        default: console.log('wrong showPage()\'s switch');
    }
}