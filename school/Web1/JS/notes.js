// Run all this in node btw, ex node Week1.js

// Generate Name, Age and boolean

let name = "John Doe";
let age = 25;
let isStudent = true;

console.log(`${name} ${age} ${isStudent}`);

// Calculate stuff

let price = 44.99;
let tps = price * 0.05;
let tvq = price * 0.09975;
let totalPrice = price + tps + tvq;
console.log(`Price: ${price.toFixed(2)} TPS: ${tps.toFixed(2)} TVQ: ${tvq.toFixed(2)} Total Price: ${totalPrice.toFixed(2)}`);

// Manipulation of string

let email = "   Alice.Tremblay@college.qc.ca     "
console.log(`Clean: ${email.trim()}`);
console.log(`Position of the @: ${email.indexOf("@")}`)
// gets the username by trimming, splitting at the @ and then taking the first part
console.log(`User: ${email.trim().split("@")[0]}`)
console.log(`normalized: ${email.trim().toLowerCase()}`)


// Challenge

let phrase = "The quick brown fox jumps over the lazy dog";
console.log(`Number of words: ${phrase.split(" ").length}`);
// gets the first and last word by splitting the phrase into an array of words and then taking the first and last element
console.log(`First and last word: ${phrase.split(" ")[0]} and ${phrase.split(" ")[phrase.split(" ").length - 1]}`);
console.log(`Caps: ${phrase.toUpperCase()}`);

// More string manipulation

let sentence = "alice Tremblay, BOB dupont, Charlie MARTIN";
let clean = sentence.trim().split(",");
console.log(`Clean: ${clean}`);
console.log(`Length: ${clean.length}`);
// maps is for arrays, if it was a string no need for it
console.log(clean.map((s) => s.trim().toLowerCase()));
// maps is for arrays, trims and then splits the strings by the space and starts at 0
console.log(`First name of everyone: ${clean.map((s) => s.trim().split(" ")[0])}`);
// turns everything to lower case and seperates it with join 
console.log(`New sentence: ${clean.map((s) => s.trim().toLowerCase()).join(" - ")}`);

// Arrays

let classes = ["HTML", "CSS", "JavaScript", "Node.js"];
console.log("Start: ", classes);
classes.unshift("Intro Web");
console.log("After unshift: ", classes);
classes.push("React");
console.log("After push: ", classes);
classes.splice(classes.indexOf("MongoDB"), 1);
console.log("After removing MongoDB: ", classes);
console.log(classes.length);

// Research in an array

let students = ["Alice", "Bob", "Charlie", "Joe"];
let search = "Eve";
students.push(search);
console.log(students);

// Calculate the average of an array

let grades = [10, 20, 30, 40, 50];
let total = 0;
grades.forEach((grade) => total += grade);
console.log(`Total: ${total}`);
let average = total / grades.length;
console.log(`Average: ${average}`);

// Challenge

let inventaire = ["Écran", "Clavier", "Souris", "Webcam", "Casque"];
console.log("Inventaire initial:", inventaire.join(", "));
inventaire.splice(inventaire.indexOf("Webcam"), 1);
inventaire.push("Microphone");
inventaire.sort();
console.log("Inventaire final:", inventaire.join(" - "));

// functions and loops

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
showBasket();

function factorial(n){
    if(n === 0 || n === 1){
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

function combination(n, r){
    if(r > n || r < 0){
        return 0;
    }
    return factorial(n) / (factorial(r) * factorial(n - r));
}


console.log(`Factorial of 5: ${factorial(5)}`);
console.log(`Combination of 5 choose 2: ${combination(5, 2)}`);
