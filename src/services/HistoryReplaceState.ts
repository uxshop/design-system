import { omit } from 'lodash-es';

export default (query: Record<string, string | number>, omitter: string[] = []) => {
  const newQuery: Record<string, string | number> = omit(query, omitter);
  const params: string[] = [];
  Object.keys(newQuery).map((key: string) => {
    if (newQuery[key] != '' && newQuery[key] != null) {
      params.push(encodeURIComponent(key) + '=' + encodeURIComponent(newQuery[key]));
    }
  });
  let queryAppend = '';
  if (params.length) {
    queryAppend = `?${params.join('&')}`;
  }
  history.replaceState({}, '', `${window.location.pathname}${queryAppend}`);
};
