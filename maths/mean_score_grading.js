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
} else if (avg < 45) {
    console.log("Grade : D");
} else if (avg < 50) {
    console.log("Grade : C");
} else if (avg < 55) {
    console.log("Grade : C+");
} else if (avg < 60) {
    console.log("Grade : B-");
} else if (avg < 65) {
    console.log("Grade : B");
} else if (avg < 70) {
    console.log("Grade : B+");
} else if (avg < 80) {
    console.log("Grade : A-");
} else if (avg < 100) {
    console.log("Grade : A");
}
// Output
// Average grade: 81.6
// Grade : A

// method2
function grades(students) {
  students.forEach(function(student) {
    let avg = (student.grades.reduce((acc, cur) => acc + cur)) / student.grades.length;
    let grade = "";

    if (avg <= 30) {
      grade = "E";
    } else if (avg <= 40) {
      grade = "D";
    } else if (avg <= 50) {
      grade = "C";
    } else if (avg <= 59) {
      grade = "B-";
    } else if (avg <= 65) {
      grade = "B";
    } else if (avg <= 75) {
      grade = "B+";
    } else if (avg <= 85) {
      grade = "A-";
    } else if (avg <= 100) {
      grade = "A";
    }

    console.log(`student: ${student.name}, average score: ${Math.round(avg)}, grade: ${grade}`);
  });
}

let students = [
  { name: "Joey", grades: [65, 78, 82] },
  { name: "Johnny", grades: [84, 90, 92] },
  { name: "DeeDee", grades: [62, 58, 71] },
  { name: "Tommy", grades: [92, 94, 96] },
  { name: "Johannes", grades: [44, 30, 12] },
  { name: "caren", grades: [24, 20, 10] },
];

grades(students);
------------------------------------------------------------------------------------------------------------------------------
    // Capture inputs from a csv file and compute averages

const fs = require('fs');
const csv = require('csv-parser');

function gradesFromCSV(csvFilePath) {
  const students = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      const student = {
        name: row.name,
        grades: parseGrades(row),
      };
      students.push(student);
    })
    .on('end', () => {
      calculateGrades(students);
    });
}

function parseGrades(row) {
  const grades = [];
  Object.keys(row).forEach((key) => {
    if (key !== 'name') {
      grades.push(parseFloat(row[key]));
    }
  });
  return grades;
}

function calculateGrades(students) {
  students.forEach(function(student) {
    let avg = (student.grades.reduce((acc, cur) => acc + cur)) / student.grades.length;
    let grade = "";

    if (avg <= 30) {
      grade = "E";
    } else if (avg <= 40) {
      grade = "D";
    } else if (avg <= 50) {
      grade = "C";
    } else if (avg <= 59) {
      grade = "B-";
    } else if (avg <= 65) {
      grade = "B";
    } else if (avg <= 75) {
      grade = "B+";
    } else if (avg <= 85) {
      grade = "A-";
    } else if (avg <= 100) {
      grade = "A";
    }

    console.log(`student: ${student.name}, average score: ${Math.round(avg)}, grade: ${grade}`);
  });
}

const csvFilePath = 'students.csv';
gradesFromCSV(csvFilePath);
