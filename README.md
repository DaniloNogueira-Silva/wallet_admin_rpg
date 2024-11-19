
# Cash Admin - Sistema financeiro

O backend de um sistema web para gestão financeira.


## Funcionalidades

- Multi-usuário
    - Geração de tokens de segurança
    - Criptografia da senha
- Realizar transações (despesa e receita)
    - valores
    - categorias
    - data de vencimento
    - descrição
- Criar e manipular categorias para as transações
- Criar e manipular sua carteira
- É possível guardar dinheiro
- Possível criar um personagem para a gamificação


## Stack utilizada

**Back-end:** Node, NestJS

**Infraestrutura:** Docker

**Banco de dados**: MySQL e sqlite

## ENTREGAS

### PRIMEIRO BIMESTRE:

- Setup do projeto ( Docker + NestJS + Jest ) (2 PONTOS)
- Criando abstração de domínio do usuario: (1 PONTOS)
- Criando abstração de domínio do carteira: (1 PONTOS)-
- Criando abstração de domínio do categorias: (1 PONTOS)
- Criando abstração de domínio do transações: (1 PONTOS)
- Criando abstração de domínio do metas: (1 PONTOS)
- Criar API do projeto + testes unitários e/ou integração (2 PONTOS)


### SEGUNDO BIMESTRE:
- Criar setup do projeto de gerenciamento do personagem (3 PONTOS)
- Criando abstração de domínio do personagem: (3 PONTOS)
- Criando abstração de domínio do items: (1 PONTOS)
- Criando abstração de domínio do equipamentos: (1 PONTOS)
- Criando abstração de domínio do combates: (1 PONTOS)
- Criar API do projeto + testes (1 PONTOS)


## Instalação

Rode os seguintes comandos:

```bash
  cd cashAdmin
  npm install

  cd gameAdmin
  npm install
```

Criar um .env seguindo o exemplo na pasta envs
