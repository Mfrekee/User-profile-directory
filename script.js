const API_URL = 'https://jsonplaceholder.typicode.com/users';


const loading = document.getElementById('loading');
const error = document.getElementById('error');
const userGrid = document.getElementById('userGrid');
const noResults = document.getElementById('noResults');
const searchInput = document.getElementById('searchInput');
const darkModeToggle = document.getElementById('darkModeToggle');

// Global variables
let allUsers = [];
let filteredUsers = [];

// Dark mode functionality
function initDarkMode() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');

        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Search functionality
function initSearch() {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();

        if (searchTerm === '') {
            filteredUsers = [...allUsers];
        } else {
            filteredUsers = allUsers.filter(user =>
                user.name.toLowerCase().includes(searchTerm) ||
                user.username.toLowerCase().includes(searchTerm)
            );
        }

        displayUsers(filteredUsers);
    });
}

// Fetch users from API
async function fetchUsers() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch users');

        const users = await response.json();
        allUsers = users;
        filteredUsers = [...users];
        displayUsers(filteredUsers);

    } catch (err) {
        showError();
    } finally {
        hideLoading();
    }
}

// Display users 
function displayUsers(users) {
    if (users.length === 0) {
        userGrid.classList.add('hidden');
        noResults.classList.remove('hidden');
        return;
    }

    noResults.classList.add('hidden');
    userGrid.innerHTML = users.map(user => createUserCard(user)).join('');
    userGrid.classList.remove('hidden');
}

// Create individual user card
function createUserCard(user) {
    return `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700">
            <div class="mb-4">
                <h3 class="text-xl font-semibold text-gray-800 dark:text-white">${user.name}</h3>
                <p class="text-gray-600 dark:text-gray-400">@${user.username}</p>
            </div>
            
            <div class="space-y-2 mb-4">
                <p class="text-sm text-gray-700 dark:text-gray-300">
                    <span class="font-medium">Email:</span> ${user.email}
                </p>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                    <span class="font-medium">Company:</span> ${user.company.name}
                </p>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                    <span class="font-medium">City:</span> ${user.address.city}
                </p>
            </div>
            
            <!-- Toggle button -->
            <button 
                onclick="toggleDetails(${user.id})" 
                class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
                View Details
            </button>
            
            <!-- Hidden details -->
            <div id="details-${user.id}" class="hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <p class="text-sm mb-2 text-gray-700 dark:text-gray-300">
                    <span class="font-medium">Phone:</span> ${user.phone}
                </p>
                <p class="text-sm mb-2 text-gray-700 dark:text-gray-300">
                    <span class="font-medium">Website:</span> 
                    <a href="http://${user.website}" target="_blank" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">${user.website}</a>
                </p>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                    <span class="font-medium">Address:</span> ${user.address.street}, ${user.address.suite}
                </p>
            </div>
        </div>
    `;
}

// Toggle details visibility
function toggleDetails(userId) {
    const details = document.getElementById(`details-${userId}`);
    const button = event.target;

    if (details.classList.contains('hidden')) {
        details.classList.remove('hidden');
        button.textContent = 'Hide Details';
    } else {
        details.classList.add('hidden');
        button.textContent = 'View Details';
    }
}

// Show error message
function showError() {
    error.classList.remove('hidden');
}

// Hide loading state
function hideLoading() {
    loading.classList.add('hidden');
}


document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initSearch();
    fetchUsers();
});