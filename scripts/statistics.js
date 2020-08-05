
function showStatistics(employees) {
    salaryStatistics.$bodyElement.empty();
    titleStatistics.$bodyElement.empty();

    salaryStatistics.addRow(getSalaryStatistics(employees.getAllEmployees()));

    getTitlesStatistics(employees).forEach(obj => {
        titleStatistics.addRow(obj);
    });
}



const getSalaryStatistics = employees => {
    const result = {};

    result.totalSalary = getTotalSalary(employees);
    result.avgSalary = getAvgSalary(employees);
    result.maxSalary = getMaxSalary(employees);
    result.minSalary = getMinSalary(employees);

    return result;
}

const getTotalSalary = employees => {
    return employees.reduce(function (sum, current) {
        return sum + Number(current.salary);
    }, 0);
}

const getAvgSalary = employees => {
    let average = getTotalSalary(employees) / employees.length;

    return Math.round(average * 100) / 100;
}

const getMaxSalary = employees => {
    let maxSalary = 0;

    employees.forEach(function (employee) {
        if (maxSalary < employee.salary) {
            maxSalary = employee.salary;
        }
    });
    return maxSalary;
}

const getMinSalary = employees => {
    let minSalary = getMaxSalary(employees);

    employees.forEach(function (employee) {
        if (minSalary > employee.salary) {
            minSalary = employee.salary
        }
    });
    return minSalary;
}



const getTitlesStatistics = employees => sortTitles(getTitlesArray(employees));

const getTitlesArray = employees => {
    const titles = employees.getAllEmployees().reduce((result, employee) => {
        result[employee.title] = result[employee.title] ? result[employee.title] + 1 : 1;
        return result;
    }, {});

    const result = Object.entries(titles).map(title => {
        return {
            title: title[0],
            count: title[1]
        }
    });
    return result;
}

const sortTitles = titles => {
    titles.sort((t1, t2) => {
        const res = t2.count - t1.count;

        if (res) {
            return res;
        }
        return t1.count > t2.count ? 1 : -1;
    });
    return titles;
}