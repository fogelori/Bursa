import { useState } from "react";

export function useVisibleHeader() {
  const [visible, setVisible] = useState(true);
  const [prevScrollpos, setPrevScrollpos] = useState(0);

  const currentScrollPos = window.pageYOffset;
  const visibleHeader = prevScrollpos > currentScrollPos;

  setVisible(visibleHeader);
  setPrevScrollpos(currentScrollPos);
  return visible;
}
