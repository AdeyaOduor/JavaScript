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

