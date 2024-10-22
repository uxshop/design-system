export interface UserProfileCardPropsDropdownItem {
  text: string;
  caption: string;
  key?: string;
  onAction?: () => void;
  icon?: string;
  to?: string | { name: string };
  href?: string;
  target?: string;
  component?: any;
}

export interface UserCard {
  name: string;
  image?: {
    src?: string;
  };
}

export interface UserProfileCardProps {
  user: UserCard;
  caption?: string;
  dropdown?: UserProfileCardPropsDropdownItem[];
  label?: string;
  dropUp?: boolean;
}

export interface UserButtonProps {
  userName: string;
  caption?: string;
  image?: string;
  hideIcon?: boolean;
}
