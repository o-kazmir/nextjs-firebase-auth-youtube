import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  inMemoryPersistence,
  setPersistence,
  useDeviceLanguage as setDeviceLanguage,
  AuthProvider,
  signInWithPopup,
  browserPopupRedirectResolver,
  UserCredential,
} from "@firebase/auth";
import { getApp, getApps, initializeApp } from "@firebase/app";
import { clientConfig } from "@/config/firebase/client-config";

export const getFirebaseApp = () => {
  if (getApps().length) {
    return getApp();
  }

  return initializeApp(clientConfig);
};

export function getFirebaseAuth() {
  const auth = getAuth(getFirebaseApp());

  setPersistence(auth, inMemoryPersistence);

  return auth;
}

export const getGoogleProvider = (auth: Auth) => {
  const provider = new GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  setDeviceLanguage(auth);
  provider.setCustomParameters({
    display: "popup",
  });

  return provider;
};

export const loginWithProvider = async (
  auth: Auth,
  provider: AuthProvider,
): Promise<UserCredential> => {
  return signInWithPopup(auth, provider, browserPopupRedirectResolver);
};
