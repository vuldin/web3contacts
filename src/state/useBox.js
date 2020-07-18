import { useRef } from "react";

export default function useBox() {
  const box = useRef();

  return { box };
}
