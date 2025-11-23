// Load stored records on page load
window.onload = function () {
    displayStudents();
};

// Add student
document.getElementById("studentForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let id = document.getElementById("studentId").value.trim();
    let email = document.getElementById("email").value.trim();
    let contact = document.getElementById("contact").value.trim();

    // VALIDATION
    if (!/^[A-Za-z ]+$/.test(name)) {
        alert("Name must contain letters only.");
        return;
    }
    if (!/^[0-9]+$/.test(id)) {
        alert("Student ID must be numeric.");
        return;
    }
    if (!/^[0-9]{10,}$/.test(contact)) {
        alert("Contact number must be at least 10 digits.");
        return;
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];

    students.push({ name, id, email, contact });
    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
    this.reset();
});

// Display students
function displayStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let tableBody = document.getElementById("tableBody");

    tableBody.innerHTML = "";

    students.forEach((student, index) => {
        let row = `
            <tr>
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button class="action-btn edit" onclick="editStudent(${index})">Edit</button>
                    <button class="action-btn delete" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Edit student
function editStudent(index) {
    let students = JSON.parse(localStorage.getItem("students"));
    let student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("studentId").value = student.id;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;

    // After editing, remove original
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
}

// Delete student
function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem("students"));
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}
