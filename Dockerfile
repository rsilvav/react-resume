# Usa la versión de Node.js requerida (por ejemplo, Node 14)
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Ejecuta npm install para instalar las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Expone el puerto que usará la aplicación (por defecto React usa 3000)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
