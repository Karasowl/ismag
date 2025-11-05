# Flujo de Trabajo: Agentes en Paralelo

Documentación para ejecutar múltiples agentes de Claude en paralelo trabajando en tareas independientes.

## Estrategia: Tareas Independientes (Sin Dependencias)

Cada agente trabaja en una rama separada con tareas que NO se superponen en archivos.

---

## 📋 Flujo Completo

### 1. Preparación (Hacer UNA SOLA VEZ al inicio)

```bash
# Asegurarse de estar en master actualizado
git checkout master
git pull origin master

# Crear ramas para cada agente
git checkout -b feature/agent-1-navbar
git push -u origin feature/agent-1-navbar

git checkout master
git checkout -b feature/agent-2-footer
git push -u origin feature/agent-2-footer

git checkout master
git checkout -b feature/agent-3-images
git push -u origin feature/agent-3-images

# Volver a master
git checkout master
```

### 2. Lanzar Agentes (En paralelo)

**Abrir 3 ventanas/sesiones de Claude Code:**

**Sesión 1 (Agente 1):**
```bash
git checkout feature/agent-1-navbar
# Instrucción al agente: "Optimiza los estilos del navbar en app/components/Navigation.jsx"
```

**Sesión 2 (Agente 2):**
```bash
git checkout feature/agent-2-footer
# Instrucción al agente: "Añade tests para el footer en app/components/Footer.test.jsx"
```

**Sesión 3 (Agente 3):**
```bash
git checkout feature/agent-3-images
# Instrucción al agente: "Optimiza todas las imágenes en /public/images/"
```

### 3. Cuando un Agente Termina

**El agente debe hacer commit en su rama:**
```bash
# El agente ejecuta esto cuando termina
git add .
git commit -m "descripción del cambio"
git push origin feature/agent-X-nombre
```

**Tú (coordinador) haces merge a master:**
```bash
# Revisar el trabajo del agente
git checkout feature/agent-1-navbar
git log --oneline -5  # Ver commits
git diff master        # Ver cambios

# Si todo está bien, hacer merge
git checkout master
git merge feature/agent-1-navbar
git push origin master

# Opcionalmente eliminar la rama
git branch -d feature/agent-1-navbar
git push origin --delete feature/agent-1-navbar
```

### 4. Repetir para Cada Agente

A medida que cada agente termina:
1. Revisas su trabajo
2. Haces merge a master
3. El siguiente agente puede seguir trabajando sin problemas

---

## 🎯 Reglas de Oro para Evitar Conflictos

### ✅ Tareas BUENAS para Paralelizar:

- **Agente 1:** Archivos del navbar (`app/components/Navigation.jsx`, `app/styles/components/navigation.css`)
- **Agente 2:** Archivos del footer (`app/components/Footer.jsx`, `app/styles/components/footer.css`)
- **Agente 3:** Optimización de imágenes (`/public/images/*`)
- **Agente 4:** Documentación (`/docs/*`, `README.md`)

### ❌ Tareas MALAS para Paralelizar:

- Dos agentes modificando el mismo archivo
- Agente 1: Refactoriza `Button.jsx`
- Agente 2: Usa `Button.jsx` (depende del Agente 1)

---

## 🔄 Si Hay Conflictos (Raro pero posible)

Si dos agentes modificaron el mismo archivo:

```bash
# Al hacer merge verás conflictos
git checkout master
git merge feature/agent-2-footer

# Git te dirá qué archivos tienen conflictos
# CONFLICT (content): Merge conflict in app/styles/global.css

# Resolver manualmente
code app/styles/global.css  # Editar y resolver <<<<<<< ======= >>>>>>>

# Marcar como resuelto
git add app/styles/global.css
git commit -m "Resuelve conflicto entre navbar y footer styles"
git push origin master
```

---

## 📊 Ejemplo Completo: 3 Agentes en Paralelo

### Planificación:
```
Agente 1: Mejorar componente de navegación
  - Archivos: app/components/Navigation.jsx, app/styles/components/navigation.css
  - Rama: feature/improve-navbar

Agente 2: Añadir tests al footer
  - Archivos: app/components/Footer.test.jsx (nuevo)
  - Rama: feature/footer-tests

Agente 3: Optimizar Hero section
  - Archivos: app/components/Hero.jsx, app/styles/components/hero.css
  - Rama: feature/optimize-hero
```

### Ejecución:
```bash
# Preparar ramas
git checkout master
git checkout -b feature/improve-navbar && git push -u origin feature/improve-navbar
git checkout master
git checkout -b feature/footer-tests && git push -u origin feature/footer-tests
git checkout master
git checkout -b feature/optimize-hero && git push -u origin feature/optimize-hero

# Lanzar 3 Claude Code en paralelo (3 ventanas)
# Ventana 1: git checkout feature/improve-navbar
# Ventana 2: git checkout feature/footer-tests
# Ventana 3: git checkout feature/optimize-hero

# Cuando terminan (en el orden que sea):
git checkout master
git merge feature/improve-navbar && git push    # Agente 1 terminó
git merge feature/footer-tests && git push      # Agente 2 terminó
git merge feature/optimize-hero && git push     # Agente 3 terminó
```

---

## 🚀 Comandos Rápidos

### Crear rama nueva para agente:
```bash
git checkout master && git checkout -b feature/NOMBRE && git push -u origin feature/NOMBRE
```

### Ver estado de todas las ramas:
```bash
git branch -a
git log --oneline --graph --all --decorate
```

### Merge rápido a master:
```bash
git checkout master && git merge feature/NOMBRE && git push origin master
```

### Limpiar ramas completadas:
```bash
git branch -d feature/NOMBRE
git push origin --delete feature/NOMBRE
```

---

## 💡 Tips y Mejores Prácticas

1. **Nombra las ramas descriptivamente:**
   - ✅ `feature/optimize-hero-section`
   - ❌ `agent-1`

2. **Commits descriptivos:**
   - ✅ `"Optimiza carga de imágenes en Hero con lazy loading"`
   - ❌ `"cambios"`

3. **Divide archivos grandes:**
   - Si un archivo es muy grande y varios agentes lo necesitan, divídelo primero

4. **Comunicación entre agentes:**
   - Los agentes NO necesitan saber de otros
   - Tú (coordinador) eres quien hace merge

5. **Testing antes de merge:**
   ```bash
   # En cada rama antes de merge
   npm run build
   npm test
   ```

---

## 🎓 Casos de Uso Reales

### Caso 1: Refactorización de estilos
```
Agente 1: Componentes de navegación (navigation.css, header.css)
Agente 2: Componentes de contenido (cards.css, grid.css)
Agente 3: Componentes de utilidad (buttons.css, forms.css)
```

### Caso 2: Añadir funcionalidades
```
Agente 1: Crear página de contacto (/routes/contacto.jsx)
Agente 2: Añadir formulario newsletter (/components/Newsletter.jsx)
Agente 3: Integrar analytics (/utils/analytics.js)
```

### Caso 3: Documentación y tests
```
Agente 1: Escribir tests para utils (/__tests__/utils.test.js)
Agente 2: Documentar API routes (/docs/api.md)
Agente 3: Actualizar README.md
```

---

## 📞 Soporte

Si tienes dudas o encuentras conflictos complejos, consulta este documento o pregunta al coordinador del proyecto.

**Última actualización:** 2025-11-04
