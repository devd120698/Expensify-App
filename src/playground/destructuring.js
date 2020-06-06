//=======================================
//      ARRAY DESTRUCTURING
//=======================================

const address = ['1299 s hjjkas', 'sajksadhj', 'hias', '5875'];
const [, city, , zip = 0] = address;

console.log(`${city} ${zip}`);




//=======================================
//      OBJECT DESTRUCTURING
//=======================================
const person = {
    name:"d",
    age:65,
    location:{
        place:"aasdd",
        temperature:45
    }
};

const { name = 'anonymous', age: ages} = person;
// const name=person.name;
// const age = person.age;

console.log(`${name} is ${ages}`);