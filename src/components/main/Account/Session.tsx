import * as accountService from "../../../services/accountService";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    try {
      const currentUser = await accountService.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (err: any) {
      console.error(err);
    }
    setPending(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!pending) {
    return children;
  }
}