function toggleAprobado(el) {
  if (el.classList.contains('bloqueado')) return;

  el.classList.toggle('aprobado');
  const id = el.dataset.id;
  if (id) {
    document.querySelectorAll(`[data-prereq="${id}"]`).forEach((ramo) => {
      ramo.classList.remove('bloqueado');
    });
  }
}
