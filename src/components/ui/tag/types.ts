export type TagVariant = 'highlight' | 'success' | 'critical' | 'default' | 'warning';

export interface TagProps {
  label?: string;
  variant?: TagVariant;
}
