import { CSSProperties } from "react";

const divider: CSSProperties = {
  width: 'calc(100% - 2rem)',
  height: '0.1rem',
  backgroundColor: 'currentColor',
};

const disabled: CSSProperties = {
  opacity: '0.5',
  pointerEvents: 'none',
};

export const styles = {
  disabled,
  divider
}
