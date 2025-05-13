// client/personnel/personnel.js

// API base URL (adjust if needed)
const API_BASE_URL = 'http://localhost:5000/api';

// Helper: get token from localStorage
function getToken() {
  return localStorage.getItem('token');
}

// Helper: set headers with auth token
function getAuthHeaders() {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

// Fetch appointments assigned to personnel
async function fetchAppointments() {
  try {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const appointments = await response.json();
    displayAppointments(appointments);
  } catch (err) {
    console.error('Failed to fetch appointments:', err);
    document.getElementById('appointmentsContainer').innerHTML = '<p>Error loading appointments.</p>';
  }
}

// Display appointments
function displayAppointments(appointments) {
  const container = document.getElementById('appointmentsContainer');
  container.innerHTML = '';
  if (appointments.length === 0) {
    container.innerHTML = '<p>No scheduled appointments.</p>';
    return;
  }
  appointments.forEach(appt => {
    const div = document.createElement('div');
    div.className = 'appointment';
    div.innerHTML = `
      <p><strong>Patient:</strong> ${appt.patient.email}</p>
      <p><strong>Time:</strong> ${new Date(appt.appointmentTime).toLocaleString()}</p>
      <p><strong>Status:</strong> ${appt.status}</p>
    `;
    container.appendChild(div);
  });
}

// Fetch emergencies
async function fetchEmergencies() {
  try {
    const response = await fetch(`${API_BASE_URL}/emergencies`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const emergencies = await response.json();
    displayEmergencies(emergencies);
  } catch (err) {
    console.error('Failed to fetch emergencies:', err);
    document.getElementById('emergenciesContainer').innerHTML = '<p>Error loading emergencies.</p>';
  }
}

// Display emergencies
function displayEmergencies(emergencies) {
  const container = document.getElementById('emergenciesContainer');
  container.innerHTML = '';
  if (emergencies.length === 0) {
    container.innerHTML = '<p>No emergencies reported.</p>';
    return;
  }
  emergencies.forEach(em => {
    const div = document.createElement('div');
    div.className = 'emergency';
    div.innerHTML = `
      <p><strong>Type:</strong> ${em.emergencyType}</p>
      <p><strong>Location:</strong> Longitude: ${em.location.coordinates[0]}, Latitude: ${em.location.coordinates[1]}</p>
      <p><strong>Status:</strong> ${em.status}</p>
      <p><strong>Reported by:</strong> ${em.patient.email}</p>
      ${em.status !== 'resolved' ? `<button onclick="assignCrew('${em._id}')">Assign Crew</button>` : ''}
    `;
    container.appendChild(div);
  });
}

// Assign crew to an emergency
async function assignCrew(emergencyId) {
  const crewId = prompt('Enter Crew User ID to assign:');
  if (!crewId) return;

  try {
    const response = await fetch(`${API_BASE_URL}/emergencies/${emergencyId}/assign`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ crewId })
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} ${errorText}`);
    }
    alert('Crew assigned successfully.');
    // Refresh emergencies list
    fetchEmergencies();
  } catch (err) {
    console.error('Failed to assign crew:', err);
    alert('Failed to assign crew.');
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  const token = getToken();
  if (!token) {
    alert('Please log in to access the dashboard.');
    window.location.href = '../login.html'; // redirect to login
    return;
  }
  fetchAppointments();
  fetchEmergencies();
});