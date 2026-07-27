# Calculadora Patrimonial (consórcio) — modelo estático replicável

Réplica funcional da calculadora de investimento em consórcio, em **HTML,
CSS e JavaScript puros** — sem build, sem Node.js, sem framework. Cada
cliente é uma pasta pronta para subir direto num servidor (HostGator ou
qualquer hospedagem, mesmo a mais simples).

## Estrutura

```
clientes/
  maav-hub/          → cliente pronto
    index.html         → estrutura da página + todos os textos
    style.css           → cores, fonte e layout
    script.js           → regras de cálculo + lógica da calculadora
    assets/              → logos
  _modelo/            → copie esta pasta para criar um novo cliente
```

Cada pasta em `clientes/` é **autossuficiente**: você pode subir só ela
para o servidor, sem depender de mais nada do projeto.

## Trocar cores, textos ou logo de um cliente existente

Não precisa saber programar — é só abrir os arquivos num editor de texto
(Bloco de Notas, VS Code, Notepad++ etc.).

- **Cores e fonte** → abra `style.css`, edite o bloco `:root { ... }` no
  topo do arquivo. Cada linha tem um comentário explicando o que ela
  controla.
- **Textos da página** (título, subtítulo, rótulos, botão) → abra
  `index.html` e edite o texto que está entre as tags (`<h1>...</h1>`,
  `<label>...</label>` etc.). Não apague as tags, só o texto de dentro.
- **Logo** → substitua os arquivos dentro de `assets/` mantendo o mesmo
  nome (`logo-horizontal.png`, `icon.png`).
- **Número/mensagem do WhatsApp** e **regras de cálculo** (valores mínimo/
  máximo do crédito, percentuais, faixas de reajuste) → abra `script.js` e
  edite o bloco `CONFIG = { ... }` no topo do arquivo.

Depois de editar, é só abrir o `index.html` duas vezes com o mouse para
ver o resultado no navegador — não precisa de servidor nem de instalar
nada para testar localmente.

## Criar a calculadora de um novo cliente

1. Copie a pasta `clientes/_modelo` inteira e renomeie para o novo
   cliente, por exemplo `clientes/consori`.
2. Coloque os arquivos de logo do cliente dentro de
   `clientes/consori/assets/` (veja `LEIA-ME.txt` dentro da pasta).
3. Edite `style.css` (cores), `index.html` (textos) e `script.js`
   (WhatsApp e regras de cálculo) dessa pasta.
4. Pronto — a pasta `clientes/consori` já é o site completo desse cliente.

## Subir na HostGator (ou qualquer hospedagem)

1. Entre no cPanel → **Gerenciador de Arquivos** (ou use um programa de
   FTP como o FileZilla).
2. Abra a pasta `public_html` (ou uma subpasta/subdomínio, se for hospedar
   mais de um cliente no mesmo domínio — ex: `public_html/maav-hub/`).
3. Envie os arquivos de dentro de `clientes/maav-hub/` (o **conteúdo** da
   pasta: `index.html`, `style.css`, `script.js` e a pasta `assets/`) para
   lá.
4. Acesse o domínio (ou `seudominio.com/maav-hub/`, se usou subpasta) —
   pronto, está no ar.

Não é necessário Node.js, npm, build nem nenhuma configuração especial no
servidor — são só arquivos estáticos, como uma página HTML comum.

## Sobre as regras de cálculo

A lógica em `script.js` replica exatamente as fórmulas da calculadora
original: reajuste INCC por faixa de prazo, parcela cheia/reduzida, renda
passiva, payback e percentual pago pelo comprador vs. inquilino. Os
números usados nessas fórmulas ficam isolados no objeto `CONFIG` no topo
do arquivo — mude só se tiver certeza do que está alterando, pois afeta o
resultado da simulação.
