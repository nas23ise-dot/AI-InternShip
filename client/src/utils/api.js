// API Base URL Configuration
const RENDER_BACKEND_URL = 'https://ai-internship.onrender.com/api';
const LOCAL_BACKEND_URL = 'http://localhost:5000/api';

// Automatically use production URL when not in development
const isDevelopment = import.meta.env.DEV || window.location.hostname === 'localhost';
export const API_BASE_URL = isDevelopment ? LOCAL_BACKEND_URL : RENDER_BACKEND_URL;

