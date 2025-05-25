function includeHTML() {
  const elements = document.querySelectorAll('[data-include]');

  elements.forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to fetch ${file}`);
        return response.text();
      })
      .then(data => {
        el.innerHTML = data;

        // After including the HTML, run the active nav highlight
        highlightActiveNav();
      })
      .catch(error => {
        console.error(error);
        el.innerHTML = "<p>Component failed to load.</p>";
      });
  });
}

function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('header .nav-link');

  navLinks.forEach(link => {
    // Remove any existing active class
    link.classList.remove('active');

    // Add active if href matches current page filename
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
}

// Load includes after DOM content
document.addEventListener('DOMContentLoaded', includeHTML);

// // js/include.js
// function includeHTML() {
//     const elements = document.querySelectorAll('[data-include]');
  
//     elements.forEach(el => {
//       const file = el.getAttribute('data-include');
//       fetch(file)
//         .then(response => {
//           if (!response.ok) throw new Error(`Failed to fetch ${file}`);
//           return response.text();
//         })
//         .then(data => {
//           el.innerHTML = data;
//         })
//         .catch(error => {
//           console.error(error);
//           el.innerHTML = "<p>Component failed to load.</p>";
//         });
//     });
//   }
  
//   // Load includes after DOM content
//   document.addEventListener('DOMContentLoaded', includeHTML);
  
