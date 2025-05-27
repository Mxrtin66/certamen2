const form = document.getElementById('studentForm');
const tableBody = document.querySelector('#studentsTable tbody');
const averageDisplay = document.getElementById('average');
const statsDisplay = document.getElementById('stats');
const nameInput = document.getElementById('name');
const lastNameInput = document.getElementById('lastName');
const gradeInput = document.getElementById('grade');
const nameError = document.getElementById('nameError');
const lastNameError = document.getElementById('lastNameError');
const gradeError = document.getElementById('gradeError');

let students = [];
let editingIndex = null;

form.addEventListener('submit', function(event) {
    event.preventDefault();
    nameError.textContent = '';
    lastNameError.textContent = '';
    gradeError.textContent = '';

    let valid = true;
    const name = nameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const grade = parseFloat(gradeInput.value);

    if (!name) {
        nameError.textContent = 'Por favor, ingrese el nombre.';
        valid = false;
    }
    if (!lastName) {
        lastNameError.textContent = 'Por favor, ingrese el apellido.';
        valid = false;
    }
    if (isNaN(grade) || grade < 1 || grade > 7) {
        gradeError.textContent = 'Nota debe estar entre 1.0 y 7.0';
        valid = false;
    }

    if (!valid) return;

    const student = { name, lastName, grade };

    if (editingIndex !== null) {
        students[editingIndex] = student;
        editingIndex = null;
    } else {
        students.push(student);
    }

    form.reset();
    renderTable();
});

function renderTable() {
    tableBody.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.lastName}</td>
            <td>${student.grade.toFixed(1)}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editStudent(${index})">Editar</button>
                <button class="action-btn delete-btn" onclick="deleteStudent(${index})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    updateStats();
}

function editStudent(index) {
    const student = students[index];
    nameInput.value = student.name;
    lastNameInput.value = student.lastName;
    gradeInput.value = student.grade;
    editingIndex = index;
}

function deleteStudent(index) {
    students.splice(index, 1);
    renderTable();
}

function updateStats() {
    const total = students.length;
    if (total === 0) {
        averageDisplay.textContent = 'Promedio General del Curso: N/A';
        statsDisplay.innerHTML = 'Total estudiantes: 0<br/>Aprobados: 0%<br/>Reprobados: 0%';
        return;
    }
    const sum = students.reduce((acc, s) => acc + s.grade, 0);
    const avg = sum / total;
    averageDisplay.textContent = `Promedio General del Curso: ${avg.toFixed(2)}`;
    const aprobados = students.filter(s => s.grade >= 4).length;
    const porcentajeAprobados = ((aprobados / total) * 100).toFixed(0);
    const porcentajeReprobados = (100 - porcentajeAprobados).toFixed(0);
    statsDisplay.innerHTML = `Total estudiantes: ${total}<br/>
                              Aprobados: ${porcentajeAprobados}%<br/>
                              Reprobados: ${porcentajeReprobados}%`;
}
