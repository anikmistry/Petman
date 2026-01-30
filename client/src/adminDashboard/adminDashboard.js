const token = sessionStorage.getItem('authToken');
const contentDiv = document.getElementById('contentdiv');
const menuButtons = document.querySelectorAll('#menudiv button:not(#close-sidebar)');

// Sidebar Elements
const sidebar = document.getElementById('menudiv');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const menuToggle = document.getElementById('dashboard-menu-toggle');
const closeSidebarBtn = document.getElementById('close-sidebar');

// Header Mobile Menu functionalities
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const navOpenIcon = document.getElementById('nav-open');
const navCloseIcon = document.getElementById('nav-close');

// Modal Elements
const quantityModal = document.getElementById('quantity-modal');
const quantityInputsContainer = document.getElementById('quantity-inputs-container');
const quantityForm = document.getElementById('quantity-form');
let activePickupId = null;

// Toggle Sidebar Function
function toggleSidebar(show) {
    if (show) {
        sidebar.classList.remove('-translate-x-full');
        sidebarOverlay.classList.remove('hidden');
    } else {
        sidebar.classList.add('-translate-x-full');
        sidebarOverlay.classList.add('hidden');
    }
}

// Event Listeners for Sidebar
if (menuToggle) {
    menuToggle.addEventListener('click', () => toggleSidebar(true));
}
if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener('click', () => toggleSidebar(false));
}
if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => toggleSidebar(false));
}

// Mobile Header Menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        navOpenIcon.classList.toggle('hidden');
        navCloseIcon.classList.toggle('hidden');
    });
}

if (!token) {
    // Ideally redirect to login, but per instructions, handle "access using search bar" imply simple protection
    window.location.href = '../../index.html'; 
}

// Verify admin role
async function verifyAdminAccess() {
    try {
        const res = await fetch('http://localhost:5000/api/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!res.ok) {
            window.location.href = '../../index.html';
            return false;
        }
        
        const user = await res.json();
        if (user.role !== 'admin') {
            alert('Access denied. Admin privileges required.');
            window.location.href = '../../index.html';
            return false;
        }
        
        return true;
    } catch (err) {
        console.error(err);
        window.location.href = '../../index.html';
        return false;
    }
}

// Check admin access before proceeding
verifyAdminAccess().then(isAdmin => {
    if (!isAdmin) return;
    
    // Initialize dashboard only if admin
    loadDashboard();
});

menuButtons.forEach(button => {
    button.addEventListener('click', () => {
        const menu = button.id.replace('menu-', '');
        if (window.innerWidth < 768) {
            toggleSidebar(false);
        }
        loadContent(menu);
    });
});

function loadContent(menu) {
    switch (menu) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'requests':
            loadRequests();
            break;
        case 'logout':
            logout();
            break;
    }
}

function logout() {
    sessionStorage.removeItem('authToken');
    window.location.href = '../../index.html';
}

async function fetchPickups() {
    try {
        const res = await fetch('http://localhost:5000/api/pickups/all', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch pickups');
        return await res.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}

async function loadDashboard() {
    contentDiv.innerHTML = '<h1 class="text-2xl font-bold mb-4">Admin Dashboard</h1><p>Loading...</p>';
    const pickups = await fetchPickups();

    const stats = {
        total: pickups.length,
        pending: pickups.filter(p => p.status === 'pending').length,
        completed: pickups.filter(p => p.status === 'completed').length,
        cancelled: pickups.filter(p => p.status === 'cancelled').length,
        totalQuantity: pickups.reduce((sum, p) => {
            if (p.status !== 'completed') return sum;
            if (p.wasteQuantities) {
                // p.wasteQuantities is a Map/Object from Mongoose
                const qMap = p.wasteQuantities;
                const actualQty = Object.values(qMap).reduce((a, b) => a + b, 0);
                return sum + (actualQty || p.quantity || 0);
            }
            return sum + (p.quantity || 0);
        }, 0)
    };

    contentDiv.innerHTML = `
        <h1 class="text-3xl font-bold mb-6 text-green-800">Admin Dashboard</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 class="text-gray-500 text-sm font-semibold mb-1">Total Pickups</h3>
                <p class="text-3xl font-bold text-gray-800">${stats.total}</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                <h3 class="text-gray-500 text-sm font-semibold mb-1">Pending Requests</h3>
                <p class="text-3xl font-bold text-gray-800">${stats.pending}</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 class="text-gray-500 text-sm font-semibold mb-1">Completed</h3>
                <p class="text-3xl font-bold text-gray-800">${stats.completed}</p>
            </div>
             <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                <h3 class="text-gray-500 text-sm font-semibold mb-1">Cancelled</h3>
                <p class="text-3xl font-bold text-gray-800">${stats.cancelled}</p>
            </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-bold mb-4 text-gray-700">Total Waste Collected</h3>
            <p class="text-4xl font-extrabold text-green-600">${stats.totalQuantity} <span class="text-xl text-gray-500">kg</span></p>
        </div>
    `;
}

async function loadRequests() {
    contentDiv.innerHTML = '<h1 class="text-2xl font-bold mb-4">Pickup Requests</h1><p>Loading...</p>';
    const pickups = await fetchPickups();

    // Sort: Pending first, then by date desc
    pickups.sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    let html = `
        <h1 class="text-3xl font-bold mb-6 text-gray-800">Manage Pickups</h1>
        <div class="space-y-4">
    `;

    if (pickups.length === 0) {
        html += '<p class="text-gray-500">No pickup requests found.</p>';
    } else {
        pickups.forEach(p => {
            const date = new Date(p.scheduledFor || p.createdAt).toLocaleString();
            const statusClass = p.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                p.status === 'completed' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800';

            const userDetails = p.user ? `
                <div class="mt-2 text-sm text-gray-600 border-t pt-2">
                    <p><span class="font-semibold">User:</span> ${p.user.name}</p>
                    <p><span class="font-semibold">Phone:</span> ${p.user.phone}</p>
                    <p><span class="font-semibold">Location:</span> ${p.user.location || 'N/A'}</p>
                </div>
            ` : '<p class="text-sm text-red-500">User Deleted</p>';

            html += `
                <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition hover:shadow-lg">
                    <div class="flex flex-col md:flex-row justify-between md:items-start gap-4">
                        <div class="flex-1">
                            <div class="flex items-center gap-3 mb-2">
                                <span class="px-3 py-1 rounded-full text-xs font-bold uppercase ${statusClass}">${p.status}</span>
                                <span class="text-gray-400 text-sm">#${p._id.slice(-6).toUpperCase()}</span>
                            </div>
                            <h3 class="text-lg font-bold text-gray-800 mb-1">${(Array.isArray(p.wasteType) ? p.wasteType.join(', ') : p.wasteType).toUpperCase()}</h3>
                            <p class="text-gray-600 mb-1"><i class="ri-scale-3-line"></i> ${p.quantity} kg (Estimated)</p>
                            
                            ${p.status === 'completed' && p.wasteQuantities && Object.keys(p.wasteQuantities).length > 0 ? `
                                <div class="bg-green-50 p-3 rounded-lg border border-green-100 mb-2">
                                    <p class="text-xs font-bold text-green-700 uppercase mb-2">Collected Quantities:</p>
                                    <div class="grid grid-cols-2 gap-2">
                                        ${Object.entries(p.wasteQuantities).map(([type, qty]) => `
                                            <div class="flex justify-between text-sm">
                                                <span class="text-gray-600 capitalize">${type.replace('_', ' ')}</span>
                                                <span class="font-bold text-green-700">${qty} kg</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}

                            <p class="text-gray-500 text-sm mb-4"><i class="ri-time-line"></i> ${date}</p>
                            
                            ${userDetails}
                            
                             ${p.details ? `<p class="mt-2 text-sm text-gray-500 bg-gray-50 p-2 rounded">"${p.details}"</p>` : ''}
                        </div>
                        
                        ${p.status === 'pending' ? `
                        <div class="flex md:flex-col gap-2 shrink-0">
                            <button onclick='window.showCompleteModal("${p._id}", ${JSON.stringify(p.wasteType)})' class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2">
                                <i class="ri-check-line"></i> Complete
                            </button>
                            <button onclick="updateStatus('${p._id}', 'cancelled')" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2">
                                <i class="ri-close-line"></i> Cancel
                            </button>
                        </div>
                        ` : ''}
                    </div>
                </div>
            `;
        });
    }

    html += '</div>';
    contentDiv.innerHTML = html;
}

window.updateStatus = async function(id, status, wasteQuantities = null) {
    if (!wasteQuantities && !confirm(`Are you sure you want to mark this pickup as ${status}?`)) return;
    
    try {
        const res = await fetch(`http://localhost:5000/api/pickups/${id}/status`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status, wasteQuantities })
        });

        if (res.ok) {
            alert(`Pickup marked as ${status}.`);
            loadRequests();
            if (status === 'completed') closeQuantityModal();
        } else {
            const errorText = await res.text();
            try {
                 const errorJson = JSON.parse(errorText);
                 alert('Failed to update status: ' + (errorJson.msg || errorJson.message || errorText));
            } catch(e) {
                 alert('Failed to update status: ' + errorText);
            }
        }
    } catch (err) {
        console.error(err);
        alert('Error updating status.');
    }
};

window.showCompleteModal = function(id, wasteTypes) {
    activePickupId = id;
    quantityInputsContainer.innerHTML = '';
    
    const types = Array.isArray(wasteTypes) ? wasteTypes : [wasteTypes];
    
    types.forEach(type => {
        const div = document.createElement('div');
        div.className = 'space-y-1';
        div.innerHTML = `
            <label class="block text-sm font-bold text-gray-700 capitalize">${type.replace('_', ' ')}</label>
            <div class="relative">
                <input type="number" step="0.1" name="${type}" required 
                    class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:outline-none pr-10"
                    placeholder="Enter weight">
                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">kg</span>
            </div>
        `;
        quantityInputsContainer.appendChild(div);
    });
    
    quantityModal.classList.remove('hidden');
};

window.closeQuantityModal = function() {
    quantityModal.classList.add('hidden');
    activePickupId = null;
    quantityForm.reset();
};

if (quantityForm) {
    quantityForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(quantityForm);
        const wasteQuantities = {};
        formData.forEach((value, key) => {
            wasteQuantities[key] = parseFloat(value);
        });
        
        await updateStatus(activePickupId, 'completed', wasteQuantities);
    });
}
