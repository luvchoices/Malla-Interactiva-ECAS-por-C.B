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
  },
  {
    semestre: "Semestre III",
    ramos: [
      { nombre: "Contabilidad II", id: "cont2", prereq: ["fundamentos", "cont1"] },
      { nombre: "Gestión de Personas", id: "gestpers", prereq: ["fundamentos", "admin"] },
      { nombre: "Matemática Aplicada III", id: "mat3", prereq: ["mat1", "mat2"] },
      { nombre: "Introducción a la Economía y Finanzas", id: "eco1", prereq: ["mat1", "mat2"] },
      { nombre: "Sistemas de Información Administrativa", id: "sisinfo", prereq: ["mat1", "tecinfo"] },
      { nombre: "Tributación I", id: "trib1", prereq: ["der1", "der2"] }
    ]
  },
  {
    semestre: "Semestre IV",
    ramos: [
      { nombre: "Contabilidad III", id: "cont3", prereq: ["fundamentos", "cont1", "cont2"] },
      { nombre: "Comercialización", id: "comerc", prereq: ["fundamentos", "admin", "gestpers"] },
      { nombre: "Estadística", id: "estad", prereq: ["mat1", "mat2", "mat3"] },
      { nombre: "Economía", id: "eco2", prereq: ["mat1", "mat2", "eco1"] },
      { nombre: "Gestión y Análisis de Datos", id: "analisis", prereq: ["mat1", "tecinfo", "sisinfo"] },
      { nombre: "Tributación II", id: "trib2", prereq: ["der1", "der2", "trib1"] }
    ]
  },
  {
    semestre: "Semestre V",
    ramos: [
      { nombre: "Contabilidad IV", id: "cont4", prereq: ["fundamentos", "cont1", "cont2", "cont3"] },
      { nombre: "Costos I", id: "cost1", prereq: ["fundamentos", "cont1", "cont2", "cont3"] },
      { nombre: "Auditoría I", id: "aud1", prereq: ["fundamentos", "cont1", "cont2", "cont3"] },
      { nombre: "Finanzas I", id: "fin1", prereq: ["mat1", "mat2", "eco1"] },
      { nombre: "Seminario de Integración", prereq: ["fundamentos", "cont1", "cont2", "cont3", "admin", "gestpers", "der1", "der2", "trib1", "trib2", "mat1", "mat2", "eco1"] },
      { nombre: "Inglés I", id: "eng1" }
    ]
  },
  {
    semestre: "Semestre VI",
    ramos: [
      { nombre: "Contabilidad Aplicada", id: "contap", prereq: ["fundamentos", "cont1", "cont2", "cont3", "cont4"] },
      { nombre: "Costos II", id: "cost2", prereq: ["fundamentos", "cont1", "cont2", "cont3", "cont4", "cost1"] },
      { nombre: "Auditoría II", id: "aud2", prereq: ["fundamentos", "cont1", "cont2", "cont3", "aud1"] },
      { nombre: "Finanzas II", id: "fin2", prereq: ["mat1", "mat2", "eco1", "fin1"] },
      { nombre: "Emprendimiento e Innovación" },
      { nombre: "Inglés II", id: "eng2", prereq: ["eng1"] }
    ]
  },
  {
    semestre: "Semestre VII",
    ramos: [
      { nombre: "Control de Gestión", id: "control", prereq: ["fundamentos", "cont1", "cont2", "cont3", "cont4", "contap"] },
      { nombre: "Auditoría III", prereq: ["fundamentos", "cont1", "cont2", "cont3", "aud1", "aud2"] },
      { nombre: "Gestión de Operaciones y Estrategia", id: "estrategia", prereq: ["fundamentos", "admin", "gestpers", "comerc"] },
      { nombre: "Finanzas III", prereq: ["mat1", "mat2", "eco1", "fin1", "fin2"] },
      { nombre: "Tributación III", id: "trib3", prereq: ["der1", "der2", "trib1", "trib2"] },
      { nombre: "Inglés III", id: "eng3", prereq: ["eng1", "eng2"] }
    ]
  },
  {
    semestre: "Semestre VIII",
    ramos: [
      { nombre: "Auditoría de Gestión", prereq: ["fundamentos", "cont1", "cont2", "cont3", "cont4", "contap", "control"] },
      { nombre: "Electivo" },
      { nombre: "Seminario de Integración Profesional", prereq: ["fundamentos", "cont1", "cont2", "cont3", "cont4", "contap", "control", "cost1", "admin", "gestpers", "comerc", "estrategia", "aud1", "aud2", "der1", "der2", "trib1", "trib2", "trib3", "mat1", "mat2", "mat3", "fin1", "fin2", "tecinfo", "sisinfo", "analisis"] },
      { nombre: "Auditoría Informática", prereq: ["mat1", "tecinfo", "sisinfo", "analisis"] },
      { nombre: "Auditoría Tributaria", prereq: ["der1", "der2", "trib1", "trib2", "trib3"] },
      { nombre: "Inglés IV", prereq: ["eng1", "eng2", "eng3"] }
    ]
  }
];

const contenedor = document.getElementById("contenedor-malla");

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
// 📂 Al cargar, recuperar ramos aprobados
const guardados = JSON.parse(localStorage.getItem("ramosAprobados") || "[]");

guardados.forEach((id) => {
  const ramo = document.querySelector(`.ramo[data-id="${id}"]`);
  if (ramo) {
    ramo.classList.remove("bloqueado"); // por si tenía prerrequisitos
    ramo.classList.add("aprobado");
    ramo.textContent = "💖 " + ramo.textContent;
  }
});

// 🔓 Verificar desbloqueo por prerrequisitos
document.querySelectorAll(".ramo[data-prereq]").forEach((ramo) => {
  const prereqs = JSON.parse(ramo.dataset.prereq);
  const desbloqueado = prereqs.every((p) =>
    document.querySelector(`.ramo[data-id="${p}"]`)?.classList.contains("aprobado")
  );
  if (desbloqueado) ramo.classList.remove("bloqueado");
});

function toggleAprobado(el) {
  if (el.classList.contains("bloqueado")) return;

  el.classList.toggle("aprobado");

  // 💾 Guardar o quitar del localStorage
  const id = el.dataset.id;
  if (id) {
    let aprobados = JSON.parse(localStorage.getItem("ramosAprobados") || "[]");
    if (el.classList.contains("aprobado")) {
      if (!aprobados.includes(id)) aprobados.push(id);
    } else {
      aprobados = aprobados.filter((x) => x !== id);
    }
    localStorage.setItem("ramosAprobados", JSON.stringify(aprobados));
  }

  // 🔓 Desbloquear ramos con prerrequisitos cumplidos
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
