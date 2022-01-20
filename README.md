LEGENDA:

**RF** Requisitos Funcionais
**RNF** Requisitos Não Funcionais
**RN** Regras de Negócio


# Cadastro de Carro

**RF**
Deve ser possível cadastrar um carro.
Deve ser possível listar todas as categorias.

**RN** 
Não deve ser possível cadastrar um carro com uma placa já existente.
Não deve ser possível alterar a placa de um carro já cadastrado.
O carro deve ser cadastrado com o default de disponibilidade true (disponível) por padrão.
Só é permitido que um user admin faça o cadastro de um carro.



# Listagem de Carros

**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome da carro.

**RN**
Não é necessário estar logado para fazer a listagem.



# Cadastro de Especificação no Carro

**RF**
Deve ser possível cadastrar uma especificação por carro.
Deve ser possível listar todas as especificações.
Deve ser possível listar todos os carros.

**RN** 
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente no carro para o mesmo carro para não haver duplicidade de especificação no mesmo carro.
Só é permitido que um user admin faça o cadastro da especificação de um carro.




# Cadastro de Imagens do Carro

**RF**
Deve ser possível cadastrar a imagem do carro.
Deve ser possível listar todos os carros.

**RNF** 
Utilizar o multer para upload dos arquivos.

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
Só é permitido que um user admin faça o cadastro da imagem de um carro.



# Agendamento de Aluguel de Carro

**RF**
Deve ser possível cadastrar um aluguel.

**RN** 
O aluguel deve ter duração mínima de 24 horas.
Só é permitido um aluguel por usuário.
Só é permitido um aluguel por carro.