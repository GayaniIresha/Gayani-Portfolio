const projectData = [
  {
    title: 'StudyMate',
    category: 'AI',
    description:
      'AI-powered study companion for notes, quizzes, flashcards, and concept explanations built as a full-stack academic project.',
    technologies: ['React', 'Vite', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Claude MCP'],
    image: '',
    githubUrl: 'https://github.com/GayaniIresha/studymate',
    liveUrl: '',
    status: 'Academic Project'
  },
  {
    title: 'Mushroom Mate',
    category: 'Full Stack',
    description:
      'A mushroom farming and customer marketplace platform with product browsing, ordering, inventory tracking, and farmer dashboards.',
    technologies: ['React', 'Node.js', 'Express.js', 'MySQL', 'REST API', 'Figma', 'draw.io'],
    image: '',
    githubUrl: 'https://github.com/GayaniIresha/mushroom-mate',
    liveUrl: '',
    status: 'Academic Individual Project'
  },
  {
    title: 'Task Manager Web Application',
    category: 'Web Development',
    description:
      'Laravel CRUD application built with MVC architecture, database operations, form validation, and a responsive Bootstrap interface.',
    technologies: ['Laravel', 'PHP', 'MySQL', 'Bootstrap 5', 'MVC', 'Eloquent ORM'],
    image: '',
    githubUrl: 'https://github.com/GayaniIresha/task-manager',
    liveUrl: '',
    status: 'Academic Project'
  }
];

const projectCategories = ['All', 'Full Stack', 'Web Development', 'AI'];

function renderProjects() {
  const grid = document.getElementById('projectGrid');
  const emptyState = document.getElementById('projectEmptyState');

  if (!grid) return;

  const selectedCategory = document.querySelector('.filter-btn.active')?.dataset.filter || 'All';
  const filteredProjects = selectedCategory === 'All'
    ? projectData
    : projectData.filter((project) => project.category === selectedCategory);

  grid.innerHTML = filteredProjects
    .map((project) => {
      const techBadges = project.technologies
        .map((tech) => `<span class="project-chip">${tech}</span>`)
        .join('');

      const githubButton = project.githubUrl
        ? `<a class="project-link" href="${project.githubUrl}" target="_blank" rel="noreferrer noopener">GitHub</a>`
        : '';

      const demoButton = project.liveUrl
        ? `<a class="project-link" href="${project.liveUrl}" target="_blank" rel="noreferrer noopener">Live Demo</a>`
        : '';

      const media = project.image
        ? `<img src="${project.image}" alt="${project.title} preview" loading="lazy" />`
        : `<div class="project-visual-fallback"><span>${project.title}</span></div>`;

      return `
        <article class="project-card">
          <div class="project-image-wrap">
            ${media}
            <span class="project-status">${project.status}</span>
          </div>
          <div class="project-body">
            <div class="project-heading-row">
              <h3>${project.title}</h3>
              <span class="project-category">${project.category}</span>
            </div>
            <p>${project.description}</p>
            <div class="project-chips">${techBadges}</div>
            <div class="project-links">
              ${githubButton}
              ${demoButton}
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  if (emptyState) {
    emptyState.hidden = filteredProjects.length !== 0;
  }
}

function setActiveFilter(category) {
  document.querySelectorAll('.filter-btn').forEach((button) => {
    const isActive = button.dataset.filter === category;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  renderProjects();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const filterContainer = document.getElementById('projectFilters');

    if (filterContainer) {
      filterContainer.innerHTML = '';
      projectCategories.forEach((category) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'filter-btn';
        if (category === 'All') button.classList.add('active');
        button.dataset.filter = category;
        button.setAttribute('aria-pressed', String(category === 'All'));
        button.textContent = category;
        button.addEventListener('click', () => setActiveFilter(category));
        filterContainer.appendChild(button);
      });
    }

    renderProjects();
  });
} else {
  renderProjects();
}
