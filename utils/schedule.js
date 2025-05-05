const timeSlots = generateTimeSlots('03:00', '23:30', 30);
const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

function isValidTimeFormat(time) {
  // Matches 00:00 to 23:30, only on the hour or half hour
  return /^([01]\d|2[0-3]):(00|30)$/.test(time);
}

function generateTimeSlots(start, end, intervalMinutes) {
  const slots = [];
  let [sh, sm] = start.split(':').map(Number);
  let [eh, em] = end.split(':').map(Number);

  let startDate = new Date(0, 0, 0, sh, sm);
  let endDate = new Date(0, 0, 0, eh, em);

  while (startDate <= endDate) {
    // Include the last time slot
    let next = new Date(startDate.getTime() + intervalMinutes * 60000);
    slots.push({
      start: startDate.toTimeString().slice(0, 5),
      end: next.toTimeString().slice(0, 5),
    });
    startDate = next;
  }
  return slots;
}

function buildEmptyGrid() {
  const tbody = document.getElementById('gridBody');
  tbody.innerHTML = '';
  timeSlots.forEach((slot) => {
    const tr = document.createElement('tr');
    const timeCell = document.createElement('td');
    timeCell.className = 'border px-2 py-1 text-sm font-medium';
    timeCell.textContent = `${slot.start} - ${slot.end}`;
    tr.appendChild(timeCell);

    for (let i = 0; i < days.length; i++) {
      const td = document.createElement('td');
      td.className = 'border px-2 py-1 text-sm';
      td.setAttribute("data-day", days[i]);
      td.setAttribute("data-time", slot.start);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  });
}

function addTask() {
  const task = document.getElementById('taskName').value.trim();
  const day = document.getElementById('day').value;
  const start = document.getElementById('startTime').value;
  const end = document.getElementById('endTime').value;

  if (!task || !start || !end) {
    alert('Please enter a task name.');
    return;
  }

  if (!isValidTimeFormat(start) || !isValidTimeFormat(end)) {
    alert('Invalid time format. Use HH:MM (03:00 to 23:30).');
    return;
  }

  console.log('Adding task:', { task, day, start, end });
  buildEmptyGrid();

  // Find the index of the time slots
  const startIndex = timeSlots.findIndex((t) => t.start === start);
  const endIndex = timeSlots.findIndex((t) => t.start === end);
  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    alert('Invalid time range.');
    return;
  }

  // Iterate through the selected time slots and add the task to the cells
  for (let i = startIndex; i < endIndex; i++) {
    const selector = `td[data-day="${day}"][data-time="${timeSlots[i].start}"]`;
    const cell = document.querySelector(selector);
    if (cell) {
      if (i === startIndex) {
        cell.innerHTML = `<div class="text-xs">${task}</div>`;
      } else {
        cell.innerHTML = '&nbsp;';
      }

      // Add styles to highlight the task
      cell.classList.add('bg-teal-500', 'font-semibold');}
    
  }

  document.getElementById('taskName').value = '';
  document.getElementById('startTime').value = '';
  document.getElementById('endTime').value = '';
}

function exportToExcel() {
  if (!timeSlots || !Array.isArray(timeSlots)) {
    alert("Time slots data is missing or invalid.");
    return;
  }

  if (!days || !Array.isArray(days)) {
    alert("Days data is missing or invalid.");
    return;
  }

  const wb = XLSX.utils.book_new();
  const ws_data = [
    ['Time Slot', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  ];
  timeSlots.forEach((slot) => {
    const row = [slot.start + ' - ' + slot.end]; // Time slot
    days.forEach((day) => {
      const cell = document.querySelector(
        `td[data-day="${day}"][data-time="${slot.start}"]`
      );
      row.push(cell ? cell.textContent.trim() : ''); // Task name or empty
      
    });
    ws_data.push(row);
  });

  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  XLSX.utils.book_append_sheet(wb, ws, 'Schedule');
  XLSX.writeFile(wb, 'Schedule.xlsx');
}

