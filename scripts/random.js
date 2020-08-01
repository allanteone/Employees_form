
class Random {

    constructor() {
        this.name = '';
        this.alphabet = ['a', 'b', 'c','d', 'e', 'f','g','h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
        this.domains = ['@gmail.com', '@yahoo.com', '@hotmail.com', '@aol.com', '@msn.com'];
        this.genders = ['male', 'female'];
        this.titles = ['Wage Employee', 'Manager', 'Sales Person', 'Sales Manager'];
        this.nameMale = ['Eddard', 'John', 'Tirion', 'Jaime', 'Sam'];
        this.nameFemale = ['Arya', 'Sansa', 'Catelyn', 'Daenerys', 'Cersei'];
    }


    getRandomNumber (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRandomElement(array) {
        return array[this.getRandomNumber(0, array.length-1)];
    }


    createRandomEmployee(idDigitsCount, minSalary, maxSalary) {
        const employeeObj = {};

        employeeObj.id = this.getRandomId(idDigitsCount);
        employeeObj.email = this.getRandomEmail();
        employeeObj.gender = this.getRandomGender();
        employeeObj.name = this.name;
        employeeObj.salary = this.getRandomSalary(minSalary, maxSalary);
        employeeObj.title = this.getRandomTitle()

        return employeeObj;
    }


    getRandomId(idDigitsCount) {
        let id = this.getRandomNumber(1, 9);

        for (let i = 1; i < idDigitsCount; i++) {
            id *= 10;
            id += this.getRandomNumber(1, 9);
        }
        return id;
    }

    getRandomEmail() {
        let email = '';

        for (let i = 0; i < 5; i++) {
            email += this.getRandomElement(this.alphabet);
        }
        return email + this.getRandomElement(this.domains);
    }

    getRandomGender() {
        let gender = this.getRandomElement(this.genders);

        switch (gender) {
            case 'male': this.name = this.getRandomElement(this.nameMale); break;
            case 'female': this.name = this.getRandomElement(this.nameFemale); break;
            default: console.log('gender fault');
        }
        return gender;
    }

    getRandomSalary(minSalary, maxSalary) {
        return this.getRandomNumber(+minSalary, +maxSalary);
    }

    getRandomTitle() {
        return this.getRandomElement(this.titles);
    }



}