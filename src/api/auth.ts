import { initializeAuth } from "firebase/auth";
import { app } from "./firebase";

export const auth = initializeAuth(app);
