const API_URL = 'https://jsonplaceholder.typicode.com/users';

// DOM elements
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const userGrid = document.getElementById('userGrid');

// Fetch users from API
async function fetchUsers() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch users');

        const users = await response.json();
        displayUsers(users);

    } catch (err) {
        showError();
    } finally {
        hideLoading();
    }
}

// Display users in grid
function displayUsers(users) {
    userGrid.innerHTML = users.map(user => createUserCard(user)).join('');
    userGrid.classList.remove('hidden');
}

// Create individual user card
function createUserCard(user) {
    return `
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div class="mb-4">
                <h3 class="text-xl font-semibold text-gray-800">${user.name}</h3>
                <p class="text-gray-600">@${user.username}</p>
            </div>
            
            <div class="space-y-2 mb-4">
                <p class="text-sm"><span class="font-medium">Email:</span> ${user.email}</p>
                <p class="text-sm"><span class="font-medium">Company:</span> ${user.company.name}</p>
                <p class="text-sm"><span class="font-medium">City:</span> ${user.address.city}</p>
            </div>
            
            <!-- Toggle button -->
            <button 
                onclick="toggleDetails(${user.id})" 
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition-colors"
            >
                View Details
            </button>
            
            <!-- Hidden details -->
            <div id="details-${user.id}" class="hidden mt-4 pt-4 border-t border-gray-200">
                <p class="text-sm mb-2"><span class="font-medium">Phone:</span> ${user.phone}</p>
                <p class="text-sm mb-2"><span class="font-medium">Website:</span> ${user.website}</p>
                <p class="text-sm"><span class="font-medium">Address:</span> ${user.address.street}, ${user.address.suite}</p>
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

// Show error state
function showError() {
    error.classList.remove('hidden');
}

// Hide loading state
function hideLoading() {
    loading.classList.add('hidden');
}

// Initialize app
fetchUsers();