const malla = [
  {
    semestre: "Semestre I",
    ramos: [
      { nombre: "Fundamentos de la Empresa", id: "fundamentos" },
      { nombre: "Metodología de la Investigación" },
      { nombre: "Habilidades Comunicacionales" },
      { nombre: "Matemática Aplicada I", id: "mat1" },
      { nombre: "Introducción al Medio y Ética Profesional" },
      { nombre: "Derecho I", id: "der1" }
    ]
  },
  {
    semestre: "Semestre II",
    ramos: [
      { nombre: "Contabilidad I", id: "cont1", prereq: ["fundamentos"] },
      { nombre: "Administración", id: "admin", prereq: ["fundamentos"] },
      { nombre: "Matemática Aplicada II", id: "mat2", prereq: ["mat1"] },
      { nombre: "Tecnología de la Información", id: "tecinfo", prereq: ["mat1"] },
      { nombre: "Derecho II", id: "der2", prereq: ["der1"] }
    ]
  }
  // 💡 Puedes seguir agregando los demás semestres aquí...
];

const contenedor = document.getElementById("contenedor-malla");

// 🔧 Generar la malla
malla.forEach((sem) => {
  const bloque = document.createElement("div");
  bloque.className = "semestre";
  const titulo = document.createElement("h2");
  titulo.textContent = sem.semestre;
  bloque.appendChild(titulo);

  sem.ramos.forEach((ramo) => {
    const div = document.createElement("div");
    div.className = "ramo";
    div.textContent = ramo.nombre;

    if (ramo.id) div.dataset.id = ramo.id;
    if (ramo.prereq) {
      div.dataset.prereq = JSON.stringify(ramo.prereq);
      div.classList.add("bloqueado");
    }

    div.onclick = () => toggleAprobado(div);
    bloque.appendChild(div);
  });

  contenedor.appendChild(bloque);
});

// 💾 Restaurar ramos aprobados desde localStorage
const guardados = JSON.parse(localStorage.getItem("ramosAprobados") || "[]");

guardados.forEach((id) => {
  const ramo = document.querySelector(`.ramo[data-id="${id}"]`);
  if (ramo) {
    // Verifica si cumple prerrequisitos
    const prereqs = ramo.dataset.prereq ? JSON.parse(ramo.dataset.prereq) : [];
    const cumplidos = prereqs.every((p) => guardados.includes(p));
    if (cumplidos) {
      ramo.classList.add("aprobado");
      ramo.textContent = "💖 " + ramo.textContent;
    } else {
      ramo.classList.add("bloqueado");
    }
  }
});

// 🔓 Desbloquear ramos con prerrequisitos cumplidos
document.querySelectorAll(".ramo[data-prereq]").forEach((ramo) => {
  const prereqs = JSON.parse(ramo.dataset.prereq);
  const desbloqueado = prereqs.every((p) =>
    document.querySelector(`.ramo[data-id="${p}"]`)?.classList.contains("aprobado")
  );
  if (desbloqueado) ramo.classList.remove("bloqueado");
});

// ✅ Función para aprobar/desaprobar ramos
function toggleAprobado(el) {
  if (el.classList.contains("bloqueado")) return;

  el.classList.toggle("aprobado");

  const id = el.dataset.id;
  if (id) {
    let aprobados = JSON.parse(localStorage.getItem("ramosAprobados") || "[]");

    if (el.classList.contains("aprobado")) {
      if (!aprobados.includes(id)) aprobados.push(id);
      if (!el.textContent.includes("💖")) el.textContent = "💖 " + el.textContent;
    } else {
      aprobados = aprobados.filter((x) => x !== id);
      el.textContent = el.textContent.replace("💖 ", "");
    }

    localStorage.setItem("ramosAprobados", JSON.stringify(aprobados));
  }

  // 🔓 Revisar nuevamente quién puede desbloquearse
  if (id) {
    document.querySelectorAll(".ramo[data-prereq]").forEach((ramo) => {
      const prereqs = JSON.parse(ramo.dataset.prereq);
      const desbloqueado = prereqs.every((p) =>
        document.querySelector(`.ramo[data-id="${p}"]`)?.classList.contains("aprobado")
      );
      if (desbloqueado) ramo.classList.remove("bloqueado");
    });
  }
}

