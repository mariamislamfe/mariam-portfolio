// Admin Configuration
const ADMIN_PASSWORD = 'mariam123';
const STORAGE_KEYS = {
    projects: 'projects',
    awards: 'awards',
    publications: 'publications',
    events: 'events',
    gallery: 'gallery'
};

// Section Configurations
const SECTION_CONFIG = {
    projects: {
        title: 'Projects Management',
        icon: 'laptop-code',
        fields: [
            { name: 'title', label: 'Project Title', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea', required: true },
            { name: 'tags', label: 'Tags (comma-separated)', type: 'text', required: true },
            { name: 'link', label: 'Project Link', type: 'text', required: false }
        ]
    },
    awards: {
        title: 'Awards Management',
        icon: 'trophy',
        fields: [
            { name: 'title', label: 'Award Title', type: 'text', required: true },
            { name: 'date', label: 'Date/Year', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea', required: true }
        ]
    },
    publications: {
        title: 'Publications Management',
        icon: 'book',
        fields: [
            { name: 'title', label: 'Publication Title', type: 'text', required: true },
            { name: 'authors', label: 'Authors', type: 'text', required: true },
            { name: 'venue', label: 'Venue/Conference', type: 'text', required: true },
            { name: 'link', label: 'Paper Link', type: 'text', required: false }
        ]
    },
    events: {
        title: 'Events Management',
        icon: 'calendar-alt',
        fields: [
            { name: 'title', label: 'Event Title', type: 'text', required: true },
            { name: 'date', label: 'Date', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea', required: true },
            { name: 'image', label: 'Image URL', type: 'text', required: true }
        ]
    },
    gallery: {
        title: 'Gallery Management',
        icon: 'images',
        fields: [
            { name: 'image', label: 'Image URL', type: 'text', required: true },
            { name: 'caption', label: 'Caption', type: 'text', required: true }
        ]
    }
};

// State Management
let currentSection = 'projects';
let currentEditId = null;

// Authentication
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    if (password === ADMIN_PASSWORD) {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('dashboardContainer').style.display = 'flex';
        sessionStorage.setItem('adminAuthenticated', 'true');
    } else {
        errorMessage.textContent = 'Invalid password!';
        setTimeout(() => {
            errorMessage.textContent = '';
        }, 3000);
    }
});

// Check if already authenticated
if (sessionStorage.getItem('adminAuthenticated') === 'true') {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('dashboardContainer').style.display = 'flex';
}

// Logout
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    sessionStorage.removeItem('adminAuthenticated');
    location.reload();
});

// Data Manager
const DataManager = {
    getData(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    },

    saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    addItem(key, item) {
        const data = this.getData(key);
        item.id = Date.now();
        data.push(item);
        this.saveData(key, data);
        return item;
    },

    updateItem(key, id, updatedItem) {
        const data = this.getData(key);
        const index = data.findIndex(item => item.id === id);
        if (index !== -1) {
            data[index] = { ...data[index], ...updatedItem };
            this.saveData(key, data);
            return data[index];
        }
        return null;
    },

    deleteItem(key, id) {
        const data = this.getData(key);
        const filtered = data.filter(item => item.id !== id);
        this.saveData(key, filtered);
    }
};

// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.dataset.section;

        // Update active state
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        // Load section
        currentSection = section;
        loadSection(section);
    });
});

// Load Section
function loadSection(section) {
    const config = SECTION_CONFIG[section];
    document.getElementById('sectionTitle').innerHTML = `<i class="fas fa-${config.icon}"></i> ${config.title}`;

    const data = DataManager.getData(section);
    renderTable(data, section);
}

// Render Table
function renderTable(data, section) {
    const contentArea = document.getElementById('contentArea');

    if (data.length === 0) {
        contentArea.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <h3>No items yet</h3>
                <p>Click "Add New" to create your first ${section} item</p>
            </div>
        `;
        return;
    }

    const config = SECTION_CONFIG[section];
    const headers = config.fields.map(field => field.label);

    contentArea.innerHTML = `
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        ${headers.map(h => `<th>${h}</th>`).join('')}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(item => renderTableRow(item, section)).join('')}
                </tbody>
            </table>
        </div>
    `;

    // Add event listeners for edit/delete buttons
    attachActionListeners();
}

function renderTableRow(item, section) {
    const config = SECTION_CONFIG[section];
    const cells = config.fields.map(field => {
        let value = item[field.name] || '';

        // Format specific fields
        if (field.name === 'tags' && Array.isArray(value)) {
            value = value.join(', ');
        } else if (field.name === 'image') {
            value = `<img src="${value}" style="max-width: 100px; border-radius: 8px;">`;
        } else if (field.type === 'textarea') {
            value = value.length > 100 ? value.substring(0, 100) + '...' : value;
        }

        return `<td>${value}</td>`;
    }).join('');

    return `
        <tr>
            ${cells}
            <td>
                <div class="action-buttons">
                    <button class="btn btn-warning btn-sm edit-btn" data-id="${item.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${item.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        </tr>
    `;
}

function attachActionListeners() {
    // Edit buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            editItem(id);
        });
    });

    // Delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            deleteItem(id);
        });
    });
}

// Add New Button
document.getElementById('addNewBtn')?.addEventListener('click', () => {
    currentEditId = null;
    showModal();
});

// Show Modal
function showModal(item = null) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const formFields = document.getElementById('formFields');

    modalTitle.textContent = item ? 'Edit Item' : 'Add New Item';

    const config = SECTION_CONFIG[currentSection];
    formFields.innerHTML = config.fields.map(field => {
        let value = '';
        if (item) {
            value = item[field.name] || '';
            if (field.name === 'tags' && Array.isArray(value)) {
                value = value.join(', ');
            }
        }

        return `
            <div class="form-group">
                <label for="${field.name}">
                    ${field.label} ${field.required ? '<span style="color: var(--danger-color);">*</span>' : ''}
                </label>
                ${field.type === 'textarea' ?
                    `<textarea id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>${value}</textarea>` :
                    `<input type="${field.type}" id="${field.name}" name="${field.name}" value="${value}" ${field.required ? 'required' : ''}>`
                }
            </div>
        `;
    }).join('');

    modal.classList.add('active');
}

// Close Modal
document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('modal').classList.remove('active');
    });
});

// Form Submit
document.getElementById('itemForm')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const item = {};

    const config = SECTION_CONFIG[currentSection];
    config.fields.forEach(field => {
        let value = formData.get(field.name);

        // Process tags
        if (field.name === 'tags') {
            value = value.split(',').map(tag => tag.trim()).filter(tag => tag);
        }

        item[field.name] = value;
    });

    if (currentEditId) {
        DataManager.updateItem(currentSection, currentEditId, item);
    } else {
        DataManager.addItem(currentSection, item);
    }

    document.getElementById('modal').classList.remove('active');
    loadSection(currentSection);
});

// Edit Item
function editItem(id) {
    const data = DataManager.getData(currentSection);
    const item = data.find(i => i.id === id);

    if (item) {
        currentEditId = id;
        showModal(item);
    }
}

// Delete Item
function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
        DataManager.deleteItem(currentSection, id);
        loadSection(currentSection);
    }
}

// Initialize Dashboard
if (sessionStorage.getItem('adminAuthenticated') === 'true') {
    loadSection('projects');
}
