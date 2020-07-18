import { useRef } from "react";

export default function useBox() {
  const space = useRef();

  return { space };
}
