/* ==========================================================================
   main.js — Portfolio (SPEC-001)
   Carga data/profile.json y data/projects.json y los pinta en el DOM.
   ========================================================================== */
'use strict';

/* ---- Utilidades ------------------------------------------------------- */

/**
 * Fetch con control de error HTTP.
 * @param {string} url
 * @returns {Promise<any>}
 */
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error ${res.status} al cargar ${url}`);
  }
  return res.json();
}

/**
 * Asigna texto al primer elemento que coincide con el selector.
 * @param {string} selector
 * @param {string} texto
 */
function setText(selector, texto) {
  const el = document.querySelector(selector);
  if (el && texto != null) el.textContent = texto;
}

/* ---- Render: perfil --------------------------------------------------- */

/**
 * Pinta los datos de data/profile.json (esquema: { perfil: {…} }).
 * @param {{ perfil: object }} data
 */
function renderProfile({ perfil }) {
  if (!perfil) return;

  setText('[data-profile-name]', perfil.nombre);
  setText('[data-profile-titular]', perfil.titular);
  setText('[data-profile-nombre]', perfil.nombre);
  setText('[data-profile-claim]', perfil.claim);

  // Foto
  const foto = document.querySelector('[data-profile-foto]');
  if (foto && perfil.foto) {
    foto.src = perfil.foto;
    foto.alt = `Foto de ${perfil.nombre}`;
  }

  // Píldora de disponibilidad
  const pill = document.querySelector('[data-profile-disponibilidad]');
  if (pill && perfil.disponibilidad) {
    pill.hidden = false;
    setText('[data-profile-disponibilidad-texto]', perfil.disponibilidad);
  }

  // Lista "ahora"
  const ahora = document.querySelector('[data-profile-ahora]');
  if (ahora && Array.isArray(perfil.ahora)) {
    ahora.replaceChildren(
      ...perfil.ahora.map((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        return li;
      })
    );
  }

  // Sobre mí (párrafos)
  const sobreMi = document.querySelector('[data-profile-sobremi]');
  if (sobreMi && Array.isArray(perfil.sobreMi)) {
    sobreMi.replaceChildren(
      ...perfil.sobreMi.map((parrafo) => {
        const p = document.createElement('p');
        p.textContent = parrafo;
        return p;
      })
    );
  }

  // Stack por grupos (chips)
  const stack = document.querySelector('[data-profile-stack]');
  if (stack && perfil.stack && typeof perfil.stack === 'object') {
    const grupos = Object.entries(perfil.stack).map(([grupo, items]) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'stack__grupo';

      const h3 = document.createElement('h3');
      h3.textContent = grupo;

      const ul = document.createElement('ul');
      ul.setAttribute('role', 'list');
      for (const item of items) {
        const li = document.createElement('li');
        const chip = document.createElement('span');
        chip.className = 'chip';
        chip.textContent = item;
        li.append(chip);
        ul.append(li);
      }

      wrapper.append(h3, ul);
      return wrapper;
    });
    stack.replaceChildren(...grupos);
  }

  // Contacto
  const correo = document.querySelector('[data-profile-correo]');
  if (correo && perfil.correo) {
    correo.href = `mailto:${perfil.correo}`;
    correo.textContent = perfil.correo;
  }
  const github = document.querySelector('[data-profile-github]');
  if (github && perfil.github) github.href = perfil.github;
  const linkedin = document.querySelector('[data-profile-linkedin]');
  if (linkedin && perfil.linkedin) linkedin.href = perfil.linkedin;
}

/* ---- Render: proyectos ------------------------------------------------- */

/**
 * Crea la tarjeta de un proyecto (esquema: id, nombre, descripcion,
 * tecnologia, imagen, enlace, fecha).
 * @param {object} proyecto
 * @returns {HTMLLIElement}
 */
function createProjectCard(proyecto) {
  const li = document.createElement('li');
  li.className = 'project-card';

  // Marco + imagen
  const frame = document.createElement('div');
  frame.className = 'project-card__frame';
  const img = document.createElement('img');
  img.src = proyecto.imagen;
  img.alt = `Captura del proyecto ${proyecto.nombre}`;
  img.loading = 'lazy';
  frame.append(img);

  // Nombre y descripción
  const nombre = document.createElement('h3');
  nombre.className = 'project-card__nombre';
  nombre.textContent = proyecto.nombre;

  const descripcion = document.createElement('p');
  descripcion.className = 'project-card__descripcion';
  descripcion.textContent = proyecto.descripcion;

  // Metadatos: chip de tecnología + fecha
  const meta = document.createElement('p');
  meta.className = 'project-card__meta';
  const chip = document.createElement('span');
  chip.className = 'chip';
  chip.textContent = proyecto.tecnologia;
  const fecha = document.createElement('span');
  fecha.textContent = proyecto.fecha;
  meta.append(chip, fecha);

  // Enlace al repo
  const enlace = document.createElement('a');
  enlace.className = 'project-card__enlace';
  enlace.href = proyecto.enlace;
  enlace.rel = 'noopener noreferrer';
  enlace.textContent = 'Ver repositorio';

  li.append(frame, nombre, descripcion, meta, enlace);
  return li;
}

/**
 * Pinta la lista de proyectos (esquema: { proyectos: [] }).
 * @param {{ proyectos: object[] }} data
 */
function renderProjects({ proyectos }) {
  const lista = document.querySelector('[data-projects-lista]');
  const estado = document.querySelector('[data-projects-estado]');
  if (!lista) return;

  if (!Array.isArray(proyectos) || proyectos.length === 0) {
    if (estado) estado.textContent = 'No hay proyectos que mostrar.';
    return;
  }

  if (estado) estado.textContent = '';
  lista.replaceChildren(...proyectos.map(createProjectCard));
}

/* ---- Init -------------------------------------------------------------- */

async function init() {
  const estado = document.querySelector('[data-projects-estado]');

  try {
    const [profile, projects] = await Promise.all([
      fetchJSON('data/profile.json'),
      fetchJSON('data/projects.json'),
    ]);
    renderProfile(profile);
    renderProjects(projects);
  } catch (error) {
    console.error('[portfolio] Error cargando datos:', error);
    if (estado) {
      estado.textContent =
        'No se han podido cargar los datos. Inténtalo de nuevo más tarde.';
    }
  }
}

document.addEventListener('DOMContentLoaded', init);
