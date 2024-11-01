export interface TopbarProps {
  slug?: string;
  backlink?: any | null;
  breadcrumb?: { to: string; name: string }[];
  notifications?: any;
  dropdown?: any[];
}
