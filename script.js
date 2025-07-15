document.addEventListener("DOMContentLoaded", () => {
  const subjects = document.querySelectorAll(".subject");

  // Inicializa estados bloqueados según prerrequisitos
  subjects.forEach(subject => {
    const prerequisites = subject.dataset.prerequisites?.split(";").map(p => p.trim()).filter(p => p);
    if (prerequisites.length > 0) {
      subject.classList.add("locked");
    }
  });

  subjects.forEach(subject => {
    subject.addEventListener("click", () => {
      // No permitir clic si está bloqueado
      if (subject.classList.contains("locked")) return;

      // Alterna clase 'approved'
      subject.classList.toggle("approved");

      // Revisa si otros ramos pueden desbloquearse
      subjects.forEach(s => {
        const reqs = s.dataset.prerequisites?.split(";").map(r => r.trim()).filter(r => r);
        const allApproved = reqs.every(req =>
          document.querySelector(`[data-name="${req}"]`)?.classList.contains("approved")
        );

        if (reqs.length > 0 && allApproved) {
          s.classList.remove("locked");
        }
      });
    });
  });
});

