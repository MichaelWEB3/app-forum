# Base image
FROM node:16

# Diretório de trabalho
WORKDIR /app

# Instalação das dependências do projeto
COPY package*.json ./
RUN npm install

# Copia os arquivos do projeto
COPY . .

# Expor a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]