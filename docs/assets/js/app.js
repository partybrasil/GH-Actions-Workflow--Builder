// GH-Actions-Workflow-Builder - Main Application
// Vanilla JavaScript implementation

// Global State
const state = {
    templates: [],
    filteredTemplates: [],
    selectedCategory: 'all',
    currentWorkflow: null,
    canvasState: {
        name: '',
        on: {},
        jobs: {}
    }
};

// Popular GitHub Actions for the marketplace
const popularActions = [
    { name: 'actions/checkout@v4', description: 'Checkout repository code' },
    { name: 'actions/setup-node@v4', description: 'Setup Node.js environment' },
    { name: 'actions/setup-python@v5', description: 'Setup Python environment' },
    { name: 'actions/setup-java@v4', description: 'Setup Java environment' },
    { name: 'actions/setup-go@v5', description: 'Setup Go environment' },
    { name: 'actions/cache@v3', description: 'Cache dependencies' },
    { name: 'actions/upload-artifact@v4', description: 'Upload build artifacts' },
    { name: 'actions/download-artifact@v4', description: 'Download artifacts' },
    { name: 'docker/setup-buildx-action@v3', description: 'Setup Docker Buildx' },
    { name: 'docker/login-action@v3', description: 'Login to Docker registry' },
    { name: 'docker/build-push-action@v5', description: 'Build and push Docker image' },
    { name: 'codecov/codecov-action@v3', description: 'Upload code coverage' },
    { name: 'github/codeql-action/init@v3', description: 'Initialize CodeQL' },
    { name: 'github/codeql-action/analyze@v3', description: 'Perform CodeQL analysis' },
    { name: 'actions/configure-pages@v4', description: 'Configure GitHub Pages' },
    { name: 'actions/deploy-pages@v4', description: 'Deploy to GitHub Pages' },
    { name: 'softprops/action-gh-release@v1', description: 'Create GitHub release' },
    { name: 'aws-actions/configure-aws-credentials@v4', description: 'Configure AWS credentials' },
    { name: 'azure/login@v1', description: 'Login to Azure' },
    { name: 'google-github-actions/setup-gcloud@v2', description: 'Setup Google Cloud SDK' }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    try {
        await loadTemplates();
        renderCategories();
        renderTemplates();
        renderActions();
        setupEventListeners();
        loadFromLocalStorage();
        showToast('✓ Aplicación cargada correctamente', 'success');
    } catch (error) {
        console.error('Error initializing app:', error);
        showToast('Error al cargar la aplicación', 'error');
    }
}

// Load Templates from JSON
async function loadTemplates() {
    try {
        const response = await fetch('data/templates.json');
        if (!response.ok) {
            throw new Error(`Failed to load templates: ${response.status} ${response.statusText}`);
        }
        state.templates = await response.json();
        state.filteredTemplates = state.templates;
        return state.templates;
    } catch (error) {
        console.error('Error loading templates:', error);
        // Show specific error message to user
        showToast(`Error cargando templates: ${error.message}. Por favor, recarga la página.`, 'error');
        // Fallback to empty array if fetch fails
        state.templates = [];
        state.filteredTemplates = [];
        return [];
    }
}

// Render Categories
function renderCategories() {
    const categoriesList = document.getElementById('categories-list');
    const categories = getCategories();
    
    const allCategory = {
        name: 'all',
        label: '📚 Todos los Templates',
        count: state.templates.length
    };
    
    const categoryItems = [allCategory, ...categories];
    
    categoriesList.innerHTML = categoryItems.map(cat => `
        <div class="category-item">
            <div class="category-header ${state.selectedCategory === cat.name ? 'active' : ''}" 
                 data-category="${cat.name}">
                <span>${cat.label}</span>
                <span class="category-count">${cat.count}</span>
            </div>
        </div>
    `).join('');
    
    // Add click event listeners
    categoriesList.querySelectorAll('.category-header').forEach(header => {
        header.addEventListener('click', (e) => {
            const category = e.currentTarget.dataset.category;
            selectCategory(category);
        });
    });
}

// Get Categories with counts
function getCategories() {
    const categoryCounts = {};
    state.templates.forEach(template => {
        categoryCounts[template.category] = (categoryCounts[template.category] || 0) + 1;
    });
    
    const categoryIcons = {
        'CI/CD': '🔄',
        'Deploy': '🚀',
        'Testing': '🧪',
        'Release': '📦',
        'Notify': '📢',
        'Custom': '⚙️'
    };
    
    return Object.entries(categoryCounts).map(([name, count]) => ({
        name,
        label: `${categoryIcons[name] || '📁'} ${name}`,
        count
    }));
}

// Select Category
function selectCategory(category) {
    state.selectedCategory = category;
    
    if (category === 'all') {
        state.filteredTemplates = state.templates;
    } else {
        state.filteredTemplates = state.templates.filter(t => t.category === category);
    }
    
    renderCategories();
    renderTemplates();
}

// Render Templates Grid
function renderTemplates() {
    const templatesGrid = document.getElementById('templates-grid');
    const templateCount = document.getElementById('template-count');
    
    templateCount.textContent = `${state.filteredTemplates.length} templates disponibles`;
    
    if (state.filteredTemplates.length === 0) {
        templatesGrid.innerHTML = '<p class="placeholder-text">No se encontraron templates</p>';
        return;
    }
    
    templatesGrid.innerHTML = state.filteredTemplates.map(template => `
        <div class="template-card" data-template-id="${template.id}">
            <h3>${template.name}</h3>
            <div class="category-badge">${template.category}</div>
            <p>${template.description}</p>
            <div class="tags">
                ${template.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
    
    // Add click event listeners
    templatesGrid.querySelectorAll('.template-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const templateId = e.currentTarget.dataset.templateId;
            loadToCanvas(templateId);
        });
    });
}

// Load Template to Canvas
function loadToCanvas(templateId) {
    const template = state.templates.find(t => t.id === templateId);
    if (!template) {
        showToast('Template no encontrado', 'error');
        return;
    }
    
    state.currentWorkflow = template;
    
    try {
        // Parse YAML (simple parse for display)
        state.canvasState = parseYAMLSimple(template.yaml);
        
        // Show canvas container
        document.getElementById('canvas-container').classList.remove('hidden');
        document.getElementById('templates-gallery').classList.add('hidden');
        document.getElementById('sidebar-categories').classList.remove('active');
        
        // Render workflow
        renderWorkflow();
        updateYAMLPreview();
        
        // Save to localStorage
        saveToLocalStorage();
        
        showToast(`Template "${template.name}" cargado`, 'success');
    } catch (error) {
        console.error('Error loading template:', error);
        showToast('Error al cargar el template', 'error');
    }
}

// Parse YAML (simple parser for display - has limitations)
// NOTE: This is a basic YAML parser for visualization purposes only.
// Limitations:
// - Does not handle complex indentation or nested structures
// - May not correctly parse all YAML features (anchors, references, multi-line strings)
// - Only extracts basic workflow structure: name, on, jobs, and steps
// - Use for display purposes only, not for YAML generation or validation
function parseYAMLSimple(yamlText) {
    const lines = yamlText.split('\n');
    const result = {
        name: '',
        on: {},
        jobs: {}
    };
    
    let currentJob = null;
    let currentSteps = [];
    let inJobsSection = false;
    
    lines.forEach(line => {
        const trimmed = line.trim();
        
        if (trimmed.startsWith('name:')) {
            result.name = trimmed.substring(5).trim();
        } else if (trimmed.startsWith('on:')) {
            result.on = { trigger: 'push/pull_request' };
        } else if (trimmed === 'jobs:') {
            inJobsSection = true;
        } else if (inJobsSection && trimmed.match(/^[a-zA-Z_][a-zA-Z0-9_-]*:$/) && !trimmed.includes('steps')) {
            // Save previous job if exists
            if (currentJob && currentSteps.length > 0) {
                result.jobs[currentJob] = { steps: currentSteps };
            }
            currentJob = trimmed.replace(':', '').trim();
            currentSteps = [];
        } else if (trimmed.startsWith('- ') || trimmed.startsWith('- name:') || trimmed.startsWith('- uses:')) {
            if (currentJob) {
                const step = trimmed.substring(2).trim();
                currentSteps.push(step);
            }
        }
    });
    
    // Save last job
    if (currentJob && currentSteps.length > 0) {
        result.jobs[currentJob] = { steps: currentSteps };
    }
    
    return result;
}

// Render Workflow on Canvas
function renderWorkflow() {
    const workflowInfo = document.getElementById('workflow-info');
    const jobsContainer = document.getElementById('jobs-container');
    
    if (!state.currentWorkflow) {
        jobsContainer.innerHTML = '<p class="placeholder-text">No hay workflow cargado</p>';
        return;
    }
    
    workflowInfo.innerHTML = `
        <h3>${state.currentWorkflow.name}</h3>
        <p>${state.currentWorkflow.description}</p>
        <div class="tags">
            ${state.currentWorkflow.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
        </div>
    `;
    
    const jobs = state.canvasState.jobs;
    
    if (Object.keys(jobs).length === 0) {
        jobsContainer.innerHTML = '<p class="placeholder-text">No hay jobs en este workflow</p>';
        return;
    }
    
    jobsContainer.innerHTML = Object.entries(jobs).map(([jobName, jobData]) => `
        <div class="job-item">
            <h4>📋 Job: ${jobName}</h4>
            ${jobData.steps.map(step => `
                <div class="step-item">${step}</div>
            `).join('')}
        </div>
    `).join('');
}

// Update YAML Preview
function updateYAMLPreview() {
    const yamlPreview = document.getElementById('yaml-preview');
    
    if (!state.currentWorkflow) {
        yamlPreview.textContent = '// Selecciona un template para ver el YAML';
        return;
    }
    
    yamlPreview.textContent = state.currentWorkflow.yaml;
}

// Render Actions List
function renderActions() {
    const actionsList = document.getElementById('actions-list');
    
    actionsList.innerHTML = popularActions.map(action => `
        <div class="action-item" data-action="${action.name}">
            <h4>${action.name}</h4>
            <p>${action.description}</p>
        </div>
    `).join('');
}

// Search Templates
function searchTemplates(query) {
    if (!query.trim()) {
        state.filteredTemplates = state.selectedCategory === 'all' 
            ? state.templates 
            : state.templates.filter(t => t.category === state.selectedCategory);
    } else {
        const lowerQuery = query.toLowerCase();
        state.filteredTemplates = state.templates.filter(template => {
            const matchesCategory = state.selectedCategory === 'all' || template.category === state.selectedCategory;
            const matchesSearch = 
                template.name.toLowerCase().includes(lowerQuery) ||
                template.description.toLowerCase().includes(lowerQuery) ||
                template.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
            return matchesCategory && matchesSearch;
        });
    }
    
    renderTemplates();
}

// Search Actions
function searchActions(query) {
    const actionsList = document.getElementById('actions-list');
    
    const filteredActions = !query.trim() 
        ? popularActions 
        : popularActions.filter(action => 
            action.name.toLowerCase().includes(query.toLowerCase()) ||
            action.description.toLowerCase().includes(query.toLowerCase())
        );
    
    actionsList.innerHTML = filteredActions.map(action => `
        <div class="action-item" draggable="true" data-action="${action.name}">
            <h4>${action.name}</h4>
            <p>${action.description}</p>
        </div>
    `).join('');
}

// Export YAML
function exportYAML() {
    if (!state.currentWorkflow) {
        showToast('No hay workflow para exportar', 'error');
        return;
    }
    
    const yaml = state.currentWorkflow.yaml;
    const blob = new Blob([yaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.currentWorkflow.id}.yml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('✓ Workflow exportado exitosamente', 'success');
}

// Copy YAML to Clipboard
async function copyYAML() {
    if (!state.currentWorkflow) {
        showToast('No hay workflow para copiar', 'error');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(state.currentWorkflow.yaml);
        showToast('✓ YAML copiado al portapapeles', 'success');
    } catch (error) {
        console.error('Error copying to clipboard:', error);
        showToast('Error al copiar al portapapeles', 'error');
    }
}

// Validate Workflow
function validateWorkflow() {
    if (!state.currentWorkflow) {
        showToast('No hay workflow para validar', 'error');
        return;
    }
    
    const yaml = state.currentWorkflow.yaml;
    const issues = [];
    
    // Basic validation checks
    if (!yaml.includes('name:')) {
        issues.push('Falta el campo "name"');
    }
    if (!yaml.includes('on:')) {
        issues.push('Falta el campo "on" (trigger)');
    }
    if (!yaml.includes('jobs:')) {
        issues.push('Falta el campo "jobs"');
    }
    if (!yaml.includes('runs-on:')) {
        issues.push('Falta especificar "runs-on" en los jobs');
    }
    if (!yaml.includes('steps:')) {
        issues.push('Falta especificar "steps" en los jobs');
    }
    
    if (issues.length === 0) {
        showToast('✓ Workflow válido según validación básica', 'success');
    } else {
        // Create HTML list for better formatting
        const issuesList = issues.map(issue => `• ${issue}`).join('<br>');
        showToast(`⚠ Problemas encontrados:<br><br>${issuesList}`, 'error');
    }
}

// Show Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.innerHTML = message; // Use innerHTML to support HTML formatting like <br> tags
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Save to LocalStorage
function saveToLocalStorage() {
    try {
        localStorage.setItem('gh-workflow-builder-state', JSON.stringify({
            currentWorkflow: state.currentWorkflow,
            selectedCategory: state.selectedCategory
        }));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

// Load from LocalStorage
function loadFromLocalStorage() {
    try {
        const saved = localStorage.getItem('gh-workflow-builder-state');
        if (saved) {
            const data = JSON.parse(saved);
            if (data.selectedCategory) {
                state.selectedCategory = data.selectedCategory;
            }
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Search templates
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', (e) => {
        searchTemplates(e.target.value);
    });
    
    // Search actions
    const actionSearchInput = document.getElementById('action-search');
    actionSearchInput.addEventListener('input', (e) => {
        searchActions(e.target.value);
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebarCategories = document.getElementById('sidebar-categories');
    mobileMenuBtn.addEventListener('click', () => {
        sidebarCategories.classList.toggle('active');
    });
    
    // Close canvas
    const closeCanvasBtn = document.getElementById('close-canvas');
    closeCanvasBtn.addEventListener('click', () => {
        document.getElementById('canvas-container').classList.add('hidden');
        document.getElementById('templates-gallery').classList.remove('hidden');
    });
    
    // Export buttons
    document.getElementById('btn-export').addEventListener('click', exportYAML);
    document.getElementById('btn-copy').addEventListener('click', copyYAML);
    document.getElementById('btn-validate').addEventListener('click', validateWorkflow);
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebarCategories.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                sidebarCategories.classList.remove('active');
            }
        }
    });
}

// Export functions for potential external use
window.GHWorkflowBuilder = {
    loadTemplates,
    loadToCanvas,
    exportYAML,
    copyYAML,
    validateWorkflow
};
