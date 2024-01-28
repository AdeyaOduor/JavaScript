// Use average marks from students to determine the corresponding grade.

let students = [['David', 80], ['Vinoth', 77], ['Divya', 88], ['Ishitha', 95], ['Thomas', 68]];

let Avgmarks = 0;
let avg = 0;

for (let i = 0; i < students.length; i++) {
    Avgmarks += students[i][1];
}

avg = Avgmarks / students.length;
console.log("Average grade: " + avg);

if (avg < 40) {
    console.log("Grade : F");
} else if (avg < 50) {
    console.log("Grade : D");
} else if (avg < 60) {
    console.log("Grade : C");
} else if (avg < 80) {
    console.log("Grade : B");
} else if (avg < 100) {
    console.log("Grade : A");
}

// method2
function grades(students) {
    students.forEach(function(student) {
      let avg = (student.grades.reduce((acc, cur) => acc + cur)) / student.grades.length;
      let grade = "";
      if (avg < 50) { grade = "F"; }
      else if (avg < 55) { grade = "D"; }
      else if (avg < 65) { grade = "C"; }
      else if (avg < 75) { grade = "B"; }
      else { grade = "A"; }
      console.log(`student: ${student.name}, average score: ${Math.round(avg)}, grade: ${grade}`);
    })
  }
  let students = [
  {name: "Joey", grades: [65,78,82]}, {name: "Johnny", grades: [84,90, 92]}, {name: "DeeDee", grades: [62, 58, 71]}, {name: "Tommy", grades: [92,94,96]}
  ]
  grades(students);
