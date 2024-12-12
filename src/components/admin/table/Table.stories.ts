import type { Meta, StoryObj } from '@storybook/vue3';
import Table from './Table.vue';
import TableBody from './TableBody.vue';
import TableCell from './TableCell.vue';
import TableHeadCell from './TableHeadCell.vue';
import TableRow from './TableRow.vue';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  render: (args) => ({
    components: { Table, TableHeadCell, TableBody, TableRow, TableCell },
    setup() {
      const products = [
        { id: 1, name: 'Product 1', price: '$10' },
        { id: 2, name: 'Product 2', price: '$20' },
        { id: 3, name: 'Product 3', price: '$30' },
      ];
      return { args, products };
    },
    template: `
    <Table v-bind="args">
      <template #header>
        <TableHeadCell>ID</TableHeadCell>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Price</TableHeadCell>
      </template>
      <TableBody>
        <TableRow v-for="product in products" :key="product.id">
          <TableCell>{{ product.id }}</TableCell>
          <TableCell>{{ product.name }}</TableCell>
          <TableCell>{{ product.price }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const minimum: Story = {
  args: {},
};
