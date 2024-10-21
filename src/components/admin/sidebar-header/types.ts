export interface SidebarHeaderProps {
  height?: string;
  logoImage?: string;
  logoSvg?: string;
  actionsConfig: {
    notification: { show: boolean; nameClass: string };
    quickSearch: { show: boolean };
  };
}
