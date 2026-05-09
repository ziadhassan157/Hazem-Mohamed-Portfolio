document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggleBtn = document.getElementById("darkModeToggle");
  const icon = toggleBtn.querySelector("i");

  // Check saved preference
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode === "false") {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  } else {
    body.classList.add("dark-mode");
    body.classList.remove("light-mode");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
    localStorage.setItem("darkMode", "true");
  }

  // Toggle dark mode
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode");

    if (body.classList.contains("dark-mode")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
      localStorage.setItem("darkMode", "true");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
      localStorage.setItem("darkMode", "false");
    }
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Load Static Projects
  loadStaticProjects();
});

function loadStaticProjects() {
  const timeline = document.getElementById("projects-timeline");
  
  // Projects Data from CV and Additional Projects
  const projectsData = [
    {
      name: "End-to-End Data Engineering Pipeline",
      details: [
        "Built an end-to-end data pipeline to address inefficient and manual data processing, enabling reliable and scalable analytics.",
        "Automated data orchestration and scheduling using Apache Airflow, reducing manual intervention by 70% and ensuring consistent pipeline execution.",
        "Integrated Snowflake as a cloud data warehouse, improving data storage efficiency and enabling faster query performance for large-scale datasets (100K+ records)."
      ],
      tags: ["dbt", "Snowflake", "Apache Airflow", "SQL", "Docker"]
    },
    {
      name: "SQL Data Warehouse Project",
      details: [
        "Designed and implemented a scalable data warehouse using SQL Server to support analytical reporting.",
        "Developed end-to-end ETL pipelines using SSIS, automating data extraction, transformation, and loading processes.",
        "Enhanced query performance by implementing indexing and partitioning strategies, reducing query execution time by up to 40%.",
        "Built interactive dashboards and reports using Power BI to deliver actionable business insights."
      ],
      tags: ["SQL Server", "SSIS", "SSRS", "Power BI"]
    },
    {
      name: "Sales Real-Time Analytics Dashboard",
      details: [
        "Designed a real-time data streaming solution processing transactional data.",
        "Utilized PySpark for real-time data transformation and PostgreSQL for reliable storage.",
        "Visualized KPIs with Power BI to monitor sales and inventory metrics seamlessly."
      ],
      tags: ["PySpark", "PostgreSQL", "Power BI", "SQL"]
    },
    {
      name: "AWS Data Lake Architecture",
      details: [
        "Architected a highly scalable Data Lake on AWS to centralize raw data.",
        "Utilized AWS S3 for storage, AWS Glue for data cataloging and ETL processes.",
        "Optimized analytical querying using Amazon Athena, reducing query costs and execution time."
      ],
      tags: ["AWS S3", "AWS Glue", "Athena", "Cloud"]
    }
  ];

  timeline.innerHTML = "";

  projectsData.forEach((repo, index) => {
    const item = document.createElement("div");
    item.className = "timeline-item";

    item.style.left = index % 2 === 0 ? "0" : "50%";

    item.innerHTML = `
      <div class="card">
        <h3>${repo.name}</h3>
        <button class="btn-details" onclick="toggleDetails(this)">
          View Details <i class="fas fa-chevron-down"></i>
        </button>
        <div class="project-details-content">
          <ul>
            ${repo.details.map(detail => `<li>${detail}</li>`).join("")}
          </ul>
        </div>
        <div class="project-tags">
          ${repo.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
        </div>
      </div>
    `;

    timeline.appendChild(item);
  });

  // Trigger animations
  setTimeout(() => {
    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('active');
      }, index * 300);
    });
  }, 100);
}

// Toggle Details Function
window.toggleDetails = function(btn) {
  const content = btn.nextElementSibling;
  btn.classList.toggle('active');
  
  if (content.classList.contains('expanded')) {
    content.classList.remove('expanded');
    btn.innerHTML = 'View Details <i class="fas fa-chevron-down"></i>';
  } else {
    content.classList.add('expanded');
    btn.innerHTML = 'Hide Details <i class="fas fa-chevron-up"></i>';
  }
};