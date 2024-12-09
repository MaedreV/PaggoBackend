Repositório do Código Fonte 

Você pode acessar o código fonte do projeto nos seguintes repositórios:

Frontend: [Aqui](https://github.com/MaedreV/PaggoFront)
Backend: [Aqui](https://github.com/MaedreV/PaggoBackend)

1- Clone os repositórios:

Clone o repositório backend: git clone https://github.com/MaedreV/PaggoBackend

2- Configuração do Backend:

Acesse a pasta do backend:
Instale as dependências: npm install ou yarn install
Configure o arquivo .env com as variáveis necessárias
Rodar o servidor: npm run start:dev ou yarn start:dev
O backend estará disponível em http://localhost:3001.

Banco de Dados:

Certifique-se de ter um banco de dados(postgres) configurado para o backend (utilizando Prisma para conexão com o banco de dados).
Execute as migrações: npx prisma migrate dev.
