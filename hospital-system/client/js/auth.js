// Base API URL
const API_URL = 'http://localhost:5000/api';

// Store token in localStorage
const setToken = (token) => {
  localStorage.setItem('hospital_token', token);
};

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('hospital_token');
};

// Remove token from localStorage
const removeToken = () => {
  localStorage.removeItem('hospital_token');
};

// Store user role in localStorage
const setRole = (role) => {
  localStorage.setItem('hospital_role', role);
};

// Get user role from localStorage
const getRole = () => {
  return localStorage.getItem('hospital_role');
};

// Check if user is authenticated
const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

// Redirect based on role
const redirectBasedOnRole = (role) => {
  switch (role) {
    case 'patient':
      window.location.href = '/client/patient/dashboard.html';
      break;
    case 'personnel':
      window.location.href = '/client/personnel/dashboard.html';
      break;
    case 'crew':
      window.location.href = '/client/crew/dashboard.html';
      break;
    default:
      window.location.href = '/login.html';
  }
};

// Register user
const register = async (email, password, role) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, role })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    
    setToken(data.token);
    setRole(data.role);
    
    return { success: true, role: data.role };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Login user
const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    
    setToken(data.token);
    setRole(data.role);
    
    return { success: true, role: data.role };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Logout user
const logout = () => {
  removeToken();
  localStorage.removeItem('hospital_role');
  window.location.href = '/login.html';
};

// Get authenticated user
const getUser = async () => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to get user');
    }
    
    return { success: true, user: data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Protected fetch function that includes auth token
const protectedFetch = async (url, options = {}) => {
  const token = getToken();
  
  if (!token) {
    throw new Error('Not authenticated');
  }
  
  const headers = {
    'Authorization': `Bearer ${token}`,
    ...options.headers
  };
  
  const response = await fetch(url, {
    ...options,
    headers
  });
  
  // If token is expired, logout
  if (response.status === 401) {
    logout();
    return;
  }
  
  return response;
};

// Check if token is valid on page load
const checkAuth = async () => {
  if (!isAuthenticated()) {
    window.location.href = '/login.html';
    return false;
  }
  
  const { success } = await getUser();
  
  if (!success) {
    logout();
    return false;
  }
  
  return true;
};

// Create appointment
const createAppointment = async (appointmentTime) => {
  try {
    const response = await protectedFetch(`${API_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ appointmentTime })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create appointment');
    }
    
    return { success: true, appointment: data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Get appointments
const getAppointments = async () => {
  try {
    const response = await protectedFetch(`${API_URL}/appointments`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to get appointments');
    }
    
    return { success: true, appointments: data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Update appointment
const updateAppointment = async (id, status) => {
  try {
    const response = await protectedFetch(`${API_URL}/appointments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update appointment');
    }
    
    return { success: true, appointment: data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Create emergency
const createEmergency = async (coordinates, emergencyType) => {
  try {
    const response = await protectedFetch(`${API_URL}/emergencies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ coordinates, emergencyType })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create emergency');
    }
    
    return { success: true, emergency: data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Get emergencies
const getEmergencies = async () => {
  try {
    const response = await protectedFetch(`${API_URL}/emergencies`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to get emergencies');
    }
    
    return { success: true, emergencies: data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Assign emergency to crew
const assignEmergency = async (id) => {
  try {
    const response = await protectedFetch(`${API_URL}/emergencies/${id}/assign`, {
      method: 'PUT'
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to assign emergency');
    }
    
    return { success: true, emergency: data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Update emergency status
const updateEmergencyStatus = async (id, status) => {
  try {
    const response = await protectedFetch(`${API_URL}/emergencies/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update emergency status');
    }
    
    return { success: true, emergency: data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};