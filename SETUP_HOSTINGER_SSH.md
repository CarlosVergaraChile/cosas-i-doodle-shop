# Configuración SSH en Hostinger para Deployment Automático

**Documento Técnico Oficial - Responsable: DevOps Team**

## Tabla de Contenidos
1. [Requisitos Previos](#requisitos-previos)
2. [Acceder a Hostinger](#acceder-a-hostinger)
3. [Generar Clave SSH](#generar-clave-ssh)
4. [Configurar SSH en Hostinger](#configurar-ssh-en-hostinger)
5. [Agregar Secretos a GitHub](#agregar-secretos-a-github)
6. [Verificar la Configuración](#verificar-la-configuración)
7. [Solucionar Problemas](#solucionar-problemas)

---

## Requisitos Previos

- Acceso a tu cuenta Hostinger (hpanel.hostinger.com)
- Acceso de administrador al repositorio de GitHub
- Una terminal/consola para generar claves SSH (Windows, Mac, o Linux)
- Conocimiento básico de línea de comandos (opcional pero recomendado)

---

## Acceder a Hostinger

### Paso 1: Inicia sesión en hPanel

1. Abre https://hpanel.hostinger.com/
2. Ingresa tus credenciales de Hostinger
3. Haz clic en tu dominio en la sección "Websites"

### Paso 2: Navega a la Sección SSH

1. En el panel de control del sitio, busca "SSH/SFTP Access" o "File Manager"
2. Haz clic en "SSH/SFTP Access" si está disponible
3. Anota los siguientes datos (los necesitarás más adelante):
   - **SSH Hostname**: generalmente `ssh.hostinger.com` o tu dominio
   - **SSH Port**: generalmente `22` (puede ser `2222` en algunos casos)
   - **SSH Username**: tu usuario de Hostinger
   - **Home Directory**: usualmente `/home/tu_usuario`

---

## Generar Clave SSH

### Opción A: En Windows (PowerShell o Git Bash)

```bash
# Abre PowerShell como administrador o Git Bash
# Ejecuta el siguiente comando:
ssh-keygen -t rsa -b 4096 -f $env:USERPROFILE\.ssh\id_rsa_hostinger -m pem

# Cuando pida contraseña (passphrase), presiona Enter sin escribir nada
# Cuando pida confirmar, presiona Enter nuevamente
```

### Opción B: En Mac o Linux

```bash
# Abre Terminal
# Ejecuta el siguiente comando:
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa_hostinger -m pem

# Cuando pida contraseña (passphrase), presiona Enter sin escribir nada
# Cuando pida confirmar, presiona Enter nuevamente
```

### Resultado

Se crearán dos archivos:
- `id_rsa_hostinger` (clave privada) - **MANTÉN ESTO EN SECRETO**
- `id_rsa_hostinger.pub` (clave pública) - Esto es lo que sube a Hostinger

---

## Configurar SSH en Hostinger

### Paso 1: Subir la Clave Pública a Hostinger

1. En hPanel, en la sección SSH/SFTP, busca "Manage SSH Keys" o "Add SSH Key"
2. Haz clic en "Add Key" o "New SSH Key"
3. Abre el archivo `id_rsa_hostinger.pub` con un editor de texto
4. Copia TODO el contenido (debería comenzar con "ssh-rsa" y terminar con tu email)
5. Pégalo en el formulario de Hostinger
6. Dale un nombre, por ejemplo: "GitHub Actions Key"
7. Haz clic en "Add SSH Key"

### Paso 2: Verificar el Directorio de Deployment

1. En hPanel, abre el "File Manager"
2. Navega a `/public_html/`
3. Si no existe una carpeta llamada `cosas-i-doodle`, créala:
   - Haz clic derecho → Nueva carpeta
   - Nombre: `cosas-i-doodle`
4. Verifica que el archivo `.htaccess` esté configurado correctamente si es necesario

---

## Agregar Secretos a GitHub

### Paso 1: Accede a Settings del Repositorio

1. Ve a https://github.com/CarlosVergaraChile/cosas-i-doodle-shop
2. Haz clic en la pestaña **Settings**
3. En el menú lateral izquierdo, haz clic en **Secrets and variables** → **Actions**
4. Haz clic en **New repository secret**

### Paso 2: Agregar HOSTINGER_SSH_HOST

1. **Name**: `HOSTINGER_SSH_HOST`
2. **Value**: Tu hostname SSH (por ejemplo: `ssh.hostinger.com` o `tu-dominio.com`)
3. Haz clic en **Add secret**

### Paso 3: Agregar HOSTINGER_SSH_USER

1. Haz clic nuevamente en **New repository secret**
2. **Name**: `HOSTINGER_SSH_USER`
3. **Value**: Tu nombre de usuario de Hostinger
4. Haz clic en **Add secret**

### Paso 4: Agregar HOSTINGER_SSH_KEY

1. Haz clic nuevamente en **New repository secret**
2. **Name**: `HOSTINGER_SSH_KEY`
3. **Value**: 
   - Abre el archivo `id_rsa_hostinger` (sin la extensión .pub) en un editor de texto
   - Copia TODO el contenido (incluyendo `-----BEGIN RSA PRIVATE KEY-----` y `-----END RSA PRIVATE KEY-----`)
   - Pégalo en este campo
4. Haz clic en **Add secret**

> **⚠️ IMPORTANTE**: 
> - Nunca compartas tu clave privada
> - Los secretos están encriptados y solo son accesibles dentro de GitHub Actions
> - No subas el archivo `id_rsa_hostinger` al repositorio

---

## Verificar la Configuración

### Prueba 1: Verificar Secretos en GitHub

1. Ve a Settings → Secrets and variables → Actions
2. Deberías ver tres secretos:
   - ✅ HOSTINGER_SSH_HOST
   - ✅ HOSTINGER_SSH_USER
   - ✅ HOSTINGER_SSH_KEY
3. No podrás ver los valores (están encriptados), pero puedes hacer clic en cada uno para confirmar que existen

### Prueba 2: Ejecutar Workflow

1. Ve a la pestaña **Actions** del repositorio
2. Busca "Deploy to Hostinger"
3. Haz clic en **Run workflow** → **Run workflow**
4. El workflow debería ejecutarse en aproximadamente 10-30 segundos
5. Si ves un ✅ verde, ¡el deployment fue exitoso!

### Prueba 3: Verificar Archivos en Hostinger

1. En hPanel, abre File Manager
2. Navega a `/public_html/cosas-i-doodle/`
3. Deberías ver los archivos del repositorio (index.html, css/, js/, etc.)
4. Verifica que el archivo `deploy.log` exista y tenga un registro reciente

---

## Solucionar Problemas

### Problema: "Permiso denegado (publickey)"

**Causa**: La clave SSH no está correctamente configurada en Hostinger

**Solución**:
1. Verifica que subiste el archivo `.pub` (no el privado) a Hostinger
2. Asegúrate de que no hay espacios extras en la clave
3. Intenta eliminar la clave de Hostinger y subirla de nuevo

### Problema: "HOSTINGER_SSH_HOST secret not configured"

**Causa**: Falta uno o más secretos en GitHub

**Solución**:
1. Ve a Settings → Secrets and variables → Actions
2. Verifica que existan los tres secretos
3. Si faltan, crea los que falten usando los pasos anteriores

### Problema: Workflow ejecuta pero no se actualiza el contenido

**Causa**: Generalmente significa que la carpeta no existe o no está en la ubicación correcta

**Solución**:
1. En Hostinger, verifica que exista `/public_html/cosas-i-doodle/`
2. Si no existe, créala
3. Ejecuta el workflow nuevamente

### Problema: "Connection refused" o "Connection timeout"

**Causa**: El host SSH es incorrecto o el puerto está bloqueado

**Solución**:
1. Verifica que HOSTINGER_SSH_HOST sea correcto
2. Intenta con el puerto 2222 en lugar de 22 si está disponible
3. Contacta a soporte de Hostinger para confirmar acceso SSH

---

## Próximos Pasos

✅ Una vez configurado:

1. Cada vez que hagas push a la rama `main`, se ejecutará automáticamente el deployment
2. Puedes monitorear el estado en la pestaña **Actions**
3. Los logs de deployment se guardan en `/public_html/cosas-i-doodle/deploy.log`

---

## Contacto y Soporte

Si encuentras problemas:
1. Revisa la sección "Solucionar Problemas" arriba
2. Verifica los logs en la pestaña Actions de GitHub
3. Contacta a tu equipo técnico

---

**Documento creado**: Diciembre 2025
**Responsable**: DevOps Team
**Estado**: Producción ✅
