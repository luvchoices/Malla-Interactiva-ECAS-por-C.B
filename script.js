let estadoRamos = JSON.parse(localStorage.getItem("estadoRamos") || "{}");

fetch("malla_ecas.json")
    .then(res => res.json())
    .then(data => {
        const mallaDiv = document.getElementById("malla");

        data.semestres.forEach((semestre, index) => {
            const semDiv = document.createElement("div");
            semDiv.className = "semestre";
            semDiv.innerHTML = `<h2>${semestre.nombre}</h2>`;

            const ramosDiv = document.createElement("div");
            ramosDiv.className = "ramos";

            semestre.ramos.forEach(ramo => {
                const btn = document.createElement("div");
                btn.className = "ramo";
                btn.dataset.codigo = ramo.codigo;
                btn.innerText = ramo.nombre;

                btn.onclick = () => {
                    if (!btn.classList.contains("bloqueado")) {
                        estadoRamos[ramo.codigo] = !estadoRamos[ramo.codigo];
                        localStorage.setItem("estadoRamos", JSON.stringify(estadoRamos));
                        render();
                    }
                };

                ramosDiv.appendChild(btn);
            });

            semDiv.appendChild(ramosDiv);
            mallaDiv.appendChild(semDiv);
        });

        function render() {
            document.querySelectorAll(".ramo").forEach(el => {
                const codigo = el.dataset.codigo;
                const aprobado = !!estadoRamos[codigo];

                const ramo = data.semestres
                    .flatMap(s => s.ramos)
                    .find(r => r.codigo === codigo);

                const cumplePrereqs = ramo.prerrequisitos.every(pr =>
                    estadoRamos[pr]);

                el.classList.remove("aprobado", "no_aprobado", "bloqueado");

                if (!cumplePrereqs && ramo.prerrequisitos.length > 0) {
                    el.classList.add("bloqueado");
                } else {
                    el.classList.add(aprobado ? "aprobado" : "no_aprobado");
                }
            });

            verificarTitulos();
        }

        function verificarTitulos() {
            const msj = document.getElementById("mensaje-final");
            const ramosAprobados = Object.keys(estadoRamos).filter(k => estadoRamos[k]);

            const tecnicoOk = data.titulos.contador_tecnico.ramos.every(r => estadoRamos[r]);
            const auditorOk = data.titulos.contador_auditor.ramos.every(r => estadoRamos[r]);

            if (auditorOk) {
                msj.innerText = "¡FELICIDADES, DESBLOQUEASTE TU TÍTULO DE CONTADOR AUDITOR EN LA ECAS!";
            } else if (tecnicoOk) {
                msj.innerText = "¡FELICIDADES, DESBLOQUEASTE TU TÍTULO DE CONTADOR TÉCNICO EN NIVEL SUPERIOR EN LA ECAS!";
            } else {
                msj.innerText = "";
            }
        }

        render();
    });

