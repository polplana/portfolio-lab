# Publicar tu portfolio

Al terminar el día 2 tu portfolio deja de ser una carpeta y pasa a ser una URL que puedes mandar.
Es lo que pide el encargo: Marta quiere abrir un enlace desde el móvil, no descargar un zip.

**Esto se hace al final, cuando el producto ya funciona.** No a mitad de un lab.

No tienes que descargarte nada ni usar el terminal: has trabajado en Teros y desde ahí mismo
puedes publicar.

---

## Antes de empezar

Necesitas una **cuenta de GitHub**. Si no la tienes, créala antes del curso: hay que verificar el
correo y eso no se hace en dos minutos.

---

## 1. Conecta GitHub en Teros

En Teros: **Apps** → **github** → conectar.

Autoriza con tu cuenta. Cuando termines debe aparecer `Connected as @tu-usuario`.

Un aviso: además de autorizar, **la Teros App tiene que quedar instalada en tu cuenta de GitHub**.
Si al pedirle algo el agente dice que no ve tus repositorios, vuelve a esta pantalla y usa
*Añadir cuenta o configurar repos en GitHub*.

## 2. Pídele al agente que lo publique

Con la app conectada, el agente trabaja con tu identidad de GitHub. Algo así:

```
Crea un repositorio público en mi cuenta de GitHub llamado portfolio
y sube todos los archivos del proyecto a la rama main.

El producto va en la raíz: index.html y lo que necesite al lado,
más las carpetas data/ y assets/.
```

Comprueba en GitHub que están tus archivos antes de seguir.

## 3. Activa Pages

Esto se hace a mano, en GitHub:

**Settings** → **Pages** (menú de la izquierda).

- **Source:** Deploy from a branch
- **Branch:** `main`
- **Folder:** `/ (root)`
- **Save**

## 4. Espera y abre

Tarda entre uno y dos minutos la primera vez. La URL es:

```
https://TU-USUARIO.github.io/portfolio/
```

**Ábrela en tu móvil.** Es la prueba real del requisito de Marta, y es donde aparecen los
problemas que en el navegador del portátil no se ven.

---

## Plan B: subir desde el navegador

Si la autorización te da problemas, no te quedes sin publicar. En tu repositorio vacío de GitHub:
**Add file** → **Upload files**, arrastra los archivos del proyecto, **Commit changes**. Luego
sigue desde el paso 3.

---

## Si sale en blanco o sin imágenes

Cuatro causas, por orden de frecuencia:

**El archivo de entrada no se llama `index.html`.** Pages solo busca ese nombre, en la raíz del
repositorio. Ni `portfolio.html` ni `index.html` dentro de una carpeta.

**Rutas absolutas.** `/assets/project-01.jpg` apunta a la raíz del dominio, que no es tu proyecto.
Todas las rutas van en relativo: `assets/project-01.jpg`.

**Faltan `data/` o `assets/`.** Si solo subiste el `index.html`, la página carga vacía. Los datos
y las imágenes van también.

**Caché.** Después de cada cambio tarda un poco en actualizarse. Recarga forzando
(`Cmd+Shift+R`) antes de dar por rota ninguna otra cosa.

---

## Cada cambio posterior

Le pides al agente que suba los cambios a tu repositorio. Pages se actualiza solo: no hay que
volver a tocar los ajustes.
