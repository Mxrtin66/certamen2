const form = document.getElementById('studentForm');
const tableBody = document.querySelector('#studentsTable tbody');
const averageDisplay = document.getElementById('average');

const nameInput = document.getElementById('name');
const lastNameInput = document.getElementById('lastName');
const gradeInput = document.getElementById('grade');

const nameError = document.getElementById('nameError');
const lastNameError = document.getElementById('lastNameError');
const gradeError = document.getElementById('gradeError');

let grades = [];
let editingRow = null;

form.addEventListener('submit', function(event) {
    event.preventDefault();

    nameError.textContent = '';
    lastNameError.textContent = '';
    gradeError.textContent = '';

    let isValid = true;
    const gradeValue = parseFloat(gradeInput.value);

    if (!nameInput.value.trim()) {
        nameError.textContent = 'Por favor, ingrese el nombre.';
        isValid = false;
    }
    if (!lastNameInput.value.trim()) {
        lastNameError.textContent = 'Por favor, ingrese el apellido.';
        isValid = false;
    }
    if (isNaN(gradeValue) || gradeValue < 1 || gradeValue > 7) {
        gradeError.textContent = 'Ingrese una nota válida entre 1 y 7.';
        isValid = false;
    }

    if (!isValid) return;

    if (editingRow) {
        // Editar fila existente
        editingRow.cells[0].textContent = nameInput.value;
        editingRow.cells[1].textContent = lastNameInput.value;
        editingRow.cells[2].textContent = gradeValue.toFixed(1);
        const index = editingRow.rowIndex - 1;
        grades[index] = gradeValue;
        editingRow = null;
    } else {
        // Agregar nueva fila
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${nameInput.value}</td>
            <td>${lastNameInput.value}</td>
            <td>${gradeValue.toFixed(1)}</td>
            <td><button class="edit-btn">Editar</button></td>
        `;
        tableBody.appendChild(row);
        grades.push(gradeValue);
    }

    updateAverage();
    form.reset();
});

function updateAverage() {
    if (grades.length === 0) {
        averageDisplay.textContent = 'Promedio General del Curso: N/A';
        return;
    }
    const sum = grades.reduce((a, b) => a + b, 0);
    const avg = sum / grades.length;
    averageDisplay.textContent = `Promedio General del Curso: ${avg.toFixed(2)}`;
}

tableBody.addEventListener('click', function (e) {
    if (e.target.classList.contains('edit-btn')) {
        const row = e.target.closest('tr');
        editingRow = row;

        nameInput.value = row.cells[0].textContent;
        lastNameInput.value = row.cells[1].textContent;
        gradeInput.value = row.cells[2].textContent;
    }
});
