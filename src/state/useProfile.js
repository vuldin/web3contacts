import { useState } from "react";

export default function useProfile() {
  const [profile, setProfile] = useState({});

  return { profile, setProfile };
}
