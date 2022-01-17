# imagem base do node
FROM node

# cria o diretório com o caminho dado para tudo que será inserido
WORKDIR /usr/app

# copia o package.json pois ele tem as dependências para o destino que é o diretório criado
COPY package.json ./

# npm é melhor no docker, dando esse comando ele baixa as dependências
RUN npm install

# agora copia tudo "." para dentro da pasta raiz "."
COPY . .

# porta 3333 que estamos usando dentro do container
EXPOSE 3333

# CMD roda o comando que queremos, rodando no caso o npm run dev
CMD [ "npm", "run", "dev" ]


# para rodar o docker file no terminal e criar imagem insere-se:
# rentx: nome da imagem | .: onde está o docker file, assim ele já procura o dockerfile
#docker build -t rentx .

# comando docker ps mostra os containers que estão rodando

# para rodar o container com a imagem criada:
# -p para mapear as portas pois o docker é como se fosse uma outra máquina | 
# 3333 porta usada no localhost : 3333 porta do container que foi passada no expose |
# rentx: imagem que quero usar
# docker run -p 3333:3333 rentx

# para parar de rodar: docker stop name_of_port(vai saber o nome dando docker ps)
# pode-se remover o container dando docker rm name_of_port
