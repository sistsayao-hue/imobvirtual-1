# IMOBVIRTUAL

Vitrine imobiliária desenvolvida com **React + Vite**, com catálogo responsivo, filtros e cadastro de imóveis.

## ✨ Recursos

- Layout sofisticado e responsivo.
- Catálogo com cards de imóveis.
- Filtros por região, bairro, valor máximo e área mínima.
- Carregamento online pela API PHP com **fallback automático para `public/apartamentos.json`**.
- Rota de cadastro preparada para envio via `FormData`.
- GitHub Pages configurado por GitHub Actions.
- `HashRouter` para evitar erro 404 ao atualizar páginas internas no GitHub Pages.

## 🚀 Rodar localmente

```bash
npm install
npm run dev
```

Para validar o build:

```bash
npm run build
```

## 🌐 GitHub Pages

O projeto está configurado para o repositório:

`/imobvirtual-1/`

Após o push na branch `main`, o workflow em `.github/workflows/deploy.yml` gera o build e publica automaticamente no GitHub Pages.

> Os arquivos de `node_modules` e `dist` não devem ser versionados. O GitHub Actions instala as dependências e cria o `dist` durante a publicação.
