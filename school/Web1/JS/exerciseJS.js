function getGrade(grade){
    if(grade >= 90){
        return "A";
    } else if(grade >= 80){
        return "B";
    } else if(grade >= 70){
        return "C";
    } else if(grade >= 60){
        return "D";
    } else {
        return "F";
    }
}

// Fizzbuzz game, if the number is divisible by 3 return Fizz, if it's divisible by 5 return Buzz, if it's divisible by both return FizzBuzz, otherwise return the number

let numbers = [1, 2, 12, 3, 15];

function fizzbuzz(num){
    if(num % 3 === 0 && num % 5 === 0){
        return "FizzBuzz";
    } else if(num % 3 === 0){
        return "Fizz";
    } else if(num % 5 === 0){
        return "Buzz";
    } else {
        return num;
    }}

// Functions to find the minimum, maximum and average of an array of grades

let notes = [95, 85, 76, 65, 54];

function findMinimumGrade(grades){
    let min = grades[0];
    for(let i = 1; i < grades.length; i++){
        if(grades[i] < min){
            min = grades[i];
        }
    }
    return min;
}

function findMaximumGrade(grades){
    let max = grades[0];
    for(let i = 1; i < grades.length; i++){
        if(grades[i] > max){
            max = grades[i];
        }
    }
    return max;
}

function calculateAverageGrade(grades){
    let total = 0;
    grades.forEach((grade) => total += grade);
    return total / grades.length;
}

console.log(`Minimum grade: ${findMinimumGrade(notes)}`);
console.log(`Maximum grade: ${findMaximumGrade(notes)}`);
console.log(`Average grade: ${calculateAverageGrade(notes)}`);

// Validate password

function validatePassword(password){
    if(password.length < 8){
        return "Password must be at least 8 characters long";
    }
    // Check if the password contains at least one uppercase letter and one number using regular expressions
    if(!/[A-Z]/.test(password)){
        return "Password must contain at least one uppercase letter";
    // Chekk if the password contains at least one number using regular expressions
    }if(!/[0-9]/.test(password)){
        return "Password must contain at least one number";
    }else{
        return "Password is valid";
    }
}

let basket = [];

function addToBasket(item, price){
    basket.push({ item, price });
}

function calculateTotal(){
    let total = 0;
    basket.forEach((item) => total += item.price);
    return total * 1.15; 
}

function showBasket(){
    console.log("Basket:");
    basket.forEach((item) => console.log(`${item.item}: $${item.price.toFixed(2)}`));
    console.log(`Total (with tax): $${calculateTotal().toFixed(2)}`);
}

addToBasket("Laptop", 999.99);
addToBasket("Mouse", 49.99);
addToBasket("Keyboard", 79.99);
showBasket();

