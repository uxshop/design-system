<p align="center">
  <a href="https://github.com/unovue/radix-vue">
  <svg xmlns="http://www.w3.org/2000/svg" width="98" height="94" fill="none"><path fill="#446285" d="M24.158 93.933c-6.66 0-12.352-2.4-17.074-7.203C2.36 81.928 0 76.16 0 69.424c0-5.845 1.75-10.996 5.249-15.455 3.499-4.46 8.104-7.296 13.816-8.51v9.213c-3.087 1.053-5.584 2.926-7.492 5.618-1.908 2.693-2.862 5.735-2.862 9.129 0 4.27 1.5 7.949 4.502 11.035 3.001 3.085 6.638 4.628 10.911 4.628 4.298 0 7.946-1.526 10.946-4.58 3-3.052 4.499-6.752 4.499-11.098v-4.46h28.3a8.909 8.909 0 0 1 2.366-1.742 6.119 6.119 0 0 1 2.798-.662c1.915 0 3.519.658 4.813 1.973 1.294 1.315 1.941 2.935 1.941 4.859 0 1.896-.647 3.52-1.94 4.87-1.295 1.35-2.9 2.025-4.814 2.025-.993 0-1.926-.22-2.798-.66a8.909 8.909 0 0 1-2.366-1.743H47.963c-1.252 5.785-4.071 10.577-8.458 14.374-4.387 3.797-9.503 5.695-15.347 5.695Zm48.875 0c-4.085 0-7.927-.98-11.527-2.944-3.6-1.962-6.508-4.733-8.721-8.31H64.9a12.721 12.721 0 0 0 3.865 1.802c1.426.4 2.848.601 4.268.601 4.302 0 7.949-1.525 10.94-4.575 2.993-3.05 4.489-6.745 4.489-11.087 0-4.367-1.496-8.074-4.488-11.122-2.992-3.048-6.64-4.572-10.941-4.572-1.659 0-3.187.235-4.587.705s-2.694 1.116-3.883 1.936L49.834 31.285c-1.663-.38-3.018-1.176-4.065-2.384-1.048-1.208-1.571-2.67-1.571-4.386 0-1.883.664-3.495 1.993-4.837 1.33-1.341 2.92-2.012 4.77-2.012 1.904 0 3.504.666 4.8 1.997 1.297 1.332 1.945 2.956 1.945 4.873 0 .343-.016.643-.05.901s-.122.64-.265 1.148l10.818 18.73a22.583 22.583 0 0 1 2.518-.329 30.14 30.14 0 0 1 2.306-.111c6.686 0 12.381 2.374 17.085 7.123 4.703 4.75 7.055 10.557 7.055 17.422 0 6.72-2.352 12.486-7.055 17.297-4.704 4.811-10.399 7.216-17.085 7.216ZM24.17 76.267c-1.866 0-3.463-.672-4.792-2.016-1.33-1.344-1.994-2.96-1.994-4.847 0-1.66.524-3.097 1.571-4.31 1.048-1.215 2.364-2.03 3.948-2.446l11.769-20.012c-2.503-2.33-4.44-5.094-5.808-8.289-1.368-3.195-2.053-6.469-2.053-9.82 0-6.808 2.367-12.597 7.101-17.37C38.647 2.387 44.333 0 50.973 0c6.535 0 12.136 2.31 16.803 6.929 4.667 4.618 7.106 10.218 7.316 16.8h-8.71c-.159-4.197-1.725-7.725-4.699-10.586-2.974-2.861-6.544-4.292-10.71-4.292-4.271 0-7.914 1.52-10.928 4.56-3.015 3.041-4.522 6.742-4.522 11.104 0 3.565 1.045 6.708 3.135 9.427 2.09 2.72 4.742 4.581 7.955 5.585L30.461 67.224c.157.448.269.84.335 1.174.065.334.098.667.098.998 0 1.892-.647 3.511-1.941 4.855-1.294 1.344-2.888 2.016-4.782 2.016Z"/></svg>        
  </a>
  <h1 align="center">
    Design System
  </h1>
  <p align="center">
    O Design System é um conjunto de diretrizes, componentes e padrões visuais e de código, criado para garantir consistência e eficiência, auxiliando no desenvolvemento de aplicações de excelente qualidade.
  <p>
</p>

### Como usar

Para usar o Design System no seu projeto, siga os passos abaixo:

1. Crie um arquivo `.npmrc` na raiz do seu projeto;
2. Adicione o seguinte conteúdo nele: `@uxshop:registry=https://npm.pkg.github.com`;
3. Adicione o pacote como dependência: `npm install --save-dev @uxshop/design-system`;

### Versões

Para as últimas alterações e versões, visite [releases](https://github.com/uxshop/design-system/releases).


### Ambiente para desenvolvimento

Para auxiliar no desenvolvimento desse pacote, siga os passos abaixo para executá-lo em sem ambiente local.

1. Clone esse repositório;
2. Execute `npm install` para instalar as dependencias;
3. Execute `npm run dev` para iniciar o desenvolvimento.

O projeto inclui uma instalação básica do Vue no qual poderá testar os componentes criados.

O projeto também inclui o Storybook com instruções de uso dos componentes já criados. Para executar o Storybook basta executar `npm run storybook`.