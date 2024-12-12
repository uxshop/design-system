<p align="center">  
  <img src="public/icon.svg" width="100"/>
  <h1 align="center">
    Design System
  </h1>
  <p align="center">
    O Design System é um conjunto de diretrizes, componentes e padrões visuais e de código, criado para garantir consistência e eficiência, auxiliando no desenvolvemento de aplicações de excelente qualidade.
  <p>
</p>

### Como usar

Para usar o Design System no seu projeto, execute o comando:

```
npm install @tray-tecnologia/design-system
```

### Importações

Todos os componentes podem ser importados individualmente pelo nome global do pacote.

```ts
import { Button } from '@tray-tecnologia/design-system';
```

Caso deseja adicionar o Design System como um plugin da sua aplicação Vue com as diretivas já instaladas, use:

```ts
import { DS } from '@tray-tecnologia/design-system/setup';
```

Caso desejar importar os filtros ou as diretivas disponibilizadas pelo Design System:

```ts
import { initials } from '@tray-tecnologia/design-system/filters';
```

Caso deseja usar somente as diretivas:

```ts
import directives from '@tray-tecnologia/design-system/directives';
```

Caso precisar qualquer coisa relacionada aos estilos disponibilizados:

```scss
import '@tray-tecnologia/design-system/theme';
```

Vale ressaltar que a importação acima não engloba os estilos individuais dos componentes, somente a base usada por todo o Design System. Estão incluídos: normalização, helpers, mixins, tokens, variáveis, formulários, tabelas e tooltips.

### Versões

Para as últimas alterações e versões, visite [releases](https://github.com/uxshop/design-system/releases).


### Ambiente para desenvolvimento

Para auxiliar no desenvolvimento desse pacote, siga os passos abaixo para executá-lo em sem ambiente local.

1. Clone esse repositório;
2. Execute `npm install` para instalar as dependencias;
3. Execute `npm run dev` para iniciar o desenvolvimento.

O projeto inclui uma instalação básica do Vue no qual poderá testar os componentes criados.

O projeto também inclui o Storybook com instruções de uso dos componentes já criados. Para executar o Storybook basta executar `npm run storybook`.