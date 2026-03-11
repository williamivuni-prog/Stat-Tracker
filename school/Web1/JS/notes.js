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

// Loops ( if else yada yada )


