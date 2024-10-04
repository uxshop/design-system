const data = [
  { id: 1, name: 'Hello World 1' },
  { id: 2, name: 'Hello World 2' },
  { id: 3, name: 'Hello World 3' },
  { id: 4, name: 'Hello World 4' },
  { id: 5, name: 'Hello World 5' },
  { id: 6, name: 'Hello World 6' },
  { id: 7, name: 'Hello World 7' },
  { id: 8, name: 'Hello World 8' },
  { id: 9, name: 'Hello World 9' },
  { id: 10, name: 'Hello World 10' },
];

const service = {
  get(params: any): Promise<any> {
    const meta = {
      current_page: params.page,
      from: 1,
      last_page: 3,
      per_page: 25,
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          meta: meta,
          data: data,
        });
      }, 2000);
    });
  },
};

export { service };
