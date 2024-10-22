import type { Alignment, Distribuition, Spacing } from '../../../types';

export interface StackProps {
  distribution?: Distribuition;
  spacing?: Spacing;
  alignment?: Alignment;
  vertical?: boolean;
  wrap?: boolean;
  columns?: number;
  horizontal?: boolean;
}
