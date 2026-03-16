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
// -------------------------------------------------------------------------------------------------------------------------------------
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
// ------------------------------------------------------------------------------------------------------------------------------
    /*mkdir ExamGradeUploads
     cd ExamGradeUploads
     npm init -y
     npm install express multer csv-parser xlsx 
     
Run the server with the command: node server.js.
Open http://localhost:3000 in your browser to access the upload interface.
    */ 

// server.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');
const xlsx = require('xlsx');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Directory to temporarily store uploaded files

app.use(express.static('public')); // Serve static files from the public directory

// Endpoint to upload files
app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = req.file.path;

  if (req.file.mimetype === 'text/csv') {
    gradesFromCSV(filePath);
  } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    gradesFromExcel(filePath);
  } else {
    return res.status(400).send('Unsupported file type');
  }

  res.send('File processed successfully.');
});

// Function to read grades from CSV file
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

// Function to read grades from Excel file
function gradesFromExcel(excelFilePath) {
  const workbook = xlsx.readFile(excelFilePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(sheet);
  const students = jsonData.map(row => {
    return {
      name: row.name,
      grades: parseGrades(row),
    };
  });

  calculateGrades(students);
}

// Function to parse grades from row data
function parseGrades(row) {
  const grades = Object.keys(row)
    .filter(key => key !== 'name')
    .map(key => parseFloat(row[key]));
    
  return grades;
}

// Function to calculate average grades and assign letter grades
function calculateGrades(students) {
  students.forEach(student => {
    let avg = student.grades.reduce((acc, cur) => acc + cur, 0) / student.grades.length;
    let grade = getLetterGrade(avg);
    console.log(`student: ${student.name}, average score: ${Math.round(avg)}, grade: ${grade}`);
  });
}

// Function to get letter grade based on average
function getLetterGrade(avg) {
  if (avg <= 30) return "E";
  if (avg <= 40) return "D";
  if (avg <= 50) return "C";
  if (avg <= 59) return "B-";
  if (avg <= 65) return "B";
  if (avg <= 75) return "B+";
  if (avg <= 85) return "A-";
  return "A";
}

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});


// public/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload Grades File</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #f0f0f0;
        }

        h1 {
            margin-bottom: 20px;
        }

        form {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        input[type="file"] {
            margin-bottom: 10px;
        }

        button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
        }

        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <h1>Upload Grades File (CSV or Excel)</h1>
    <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="file" accept=".csv, .xlsx" required />
        <button type="submit">Upload</button>
    </form>
</body>
</html>
