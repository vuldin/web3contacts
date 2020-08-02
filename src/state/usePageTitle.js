import { useState } from "react";
import { ADDRESS_BOOK_TITLE } from "../constants";

export default function PageTitle() {
  const [pageTitle, setPageTitle] = useState(ADDRESS_BOOK_TITLE);

  return { pageTitle, setPageTitle };
}
