import Container from './container/Container.vue';
import Row from './row/Row.vue';
import Col from './col/Col.vue';
import type { ComponentOptions } from 'vue';

export default {
  install(app: ComponentOptions, { prefix }: { prefix: string }) {
    app.component(`${prefix}Container`, Container);
    app.component(`${prefix}Row`, Row);
    app.component(`${prefix}Col`, Col);
  },
};
