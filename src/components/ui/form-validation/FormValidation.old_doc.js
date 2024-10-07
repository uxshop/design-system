import FormValidation from './FormValidation.vue';
import { ref } from 'vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/FormValidation',
  component: FormValidation,
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { FormValidation },
  setup() {
    const model = ref({
      doc: ['Email inválido', 'Email inválido'],
    });

    function setError() {
      model.value = {
        doc: ['Email inválido', 'Email inválido'],
      };
    }
    return { args, model, setError };
  },
  template: `
    <FormValidation v-bind="args" v-model:errors="model" />
		<button @click="setError">teste</button>	
  `,
});

export const Default = Template.bind({});
Default.args = {
  translate: {
    name: 'Nome da Taxa',
    doc: 'Documento',
  },
};
