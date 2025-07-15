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
      { nombre: "Contabilidad II", id: "cont2", prereq: ["cont1", "fundamentos"] },
      { nombre: "Gestión de Personas", id: "gestpers", prereq: ["admin", "fundamentos"] },
      { nombre: "Matemática Aplicada III", id: "mat3", prereq: ["mat2", "mat1"] },
      { nombre: "Introducción a la Economía y Finanzas", id: "eco1", prereq: ["mat1", "mat2"] },
      { nombre: "Sistemas de Información Administrativa", id: "sisinfo", prereq: ["tecinfo", "mat1"] },
      { nombre: "Tributación I", id: "trib1", prereq: ["der2", "der1"] }
    ]
  },
  {
    semestre: "Semestre IV",
    ramos: [
      { nombre: "Contabilidad III", id: "cont3", prereq: ["cont2"] },
      { nombre: "Comercialización", id: "comerc", prereq: ["gestpers", "admin"] },
      { nombre: "Estadística", id: "estad", prereq: ["mat3"] },
      { nombre: "Economía", id: "eco2", prereq: ["eco1"] },
      { nombre: "Gestión y Análisis de Datos", id: "analisis", prereq: ["sisinfo"] },
      { nombre: "Tributación II", id: "trib2", prereq: ["trib1"] }
    ]
  },
  {
    semestre: "Semestre V",
    ramos: [
      { nombre: "Contabilidad IV", id: "cont4", prereq: ["cont3"] },
      { nombre: "Costos I", id: "cost1", prereq: ["cont3"] },
      { nombre: "Auditoría I", id: "aud1", prereq: ["cont3"] },
      { nombre: "Finanzas I", id: "fin1", prereq: ["eco1"] },
      { nombre: "Seminario de Integración", id: "sem1", prereq: ["cont3", "admin", "gestpers", "trib2", "eco1"] },
      { nombre: "Inglés I", id: "eng1" }
    ]
  },
  {
    semestre: "Semestre VI",
    ramos: [
      { nombre: "Contabilidad Aplicada", id: "contap", prereq: ["cont4"] },
      { nombre: "Costos II", id: "cost2", prereq: ["cost1"] },
      { nombre: "Auditoría II", id: "aud2", prereq: ["aud1"] },
      { nombre: "Finanzas II", id: "fin2", prereq: ["fin1"] },
      { nombre: "Emprendimiento e Innovación" },
      { nombre: "Inglés II", id: "eng2", prereq: ["eng1"] }
    ]
  },
  {
    semestre: "Semestre VII",
    ramos: [
      { nombre: "Control de Gestión", id: "control", prereq: ["contap"] },
      { nombre: "Auditoría III", id: "aud3", prereq: ["aud2"] },
      { nombre: "Gestión de Operaciones y Estrategia", id: "estrategia", prereq: ["comerc"] },
      { nombre: "Finanzas III", id: "fin3", prereq: ["fin2"] },
      { nombre: "Tributación III", id: "trib3", prereq: ["trib2"] },
      { nombre: "Inglés III", id: "eng3", prereq: ["eng2"] }
    ]
  },
  {
    semestre: "Semestre VIII",
    ramos: [
      { nombre: "Auditoría de Gestión", id: "audgest", prereq: ["control"] },
      { nombre: "Electivo" },
      { nombre: "Seminario de Integración Profesional", id: "sem2", prereq: ["aud3", "fin3", "estrategia"] },
      { nombre: "Auditoría Informática", id: "audinfo", prereq: ["analisis"] },
      { nombre: "Auditoría Tributaria", id: "audtrib", prereq: ["trib3"] },
      { nombre: "Inglés IV", id: "eng4", prereq: ["eng3"] }
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

const guardados = JSON.parse(localStorage.getItem("ramosAprobados") || "[]");

guardados.forEach((id) => {
  const ramo = document.querySelector(`.ramo[data-id="${id}"]`);
  if (ramo) {
    const prereqs = ramo.dataset.prereq ? JSON.parse(ramo.dataset.prereq) : [];
    const cumplidos = prereqs.every((p) => guardados.includes(p));
    if (cumplidos) {
      ramo.classList.add("aprobado");
      ramo.textContent = "💖 " + ramo.textContent;
    }
  }
});

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

  document.querySelectorAll(".ramo[data-prereq]").forEach((ramo) => {
    const prereqs = JSON.parse(ramo.dataset.prereq);
    const desbloqueado = prereqs.every((p
