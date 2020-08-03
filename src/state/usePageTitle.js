import { useRef, useState } from "react";

export default function PageTitle() {
  const AddButton = useRef();
  const [pageTitle, setPageTitle] = useState("");

  return { AddButton, pageTitle, setPageTitle };
}
