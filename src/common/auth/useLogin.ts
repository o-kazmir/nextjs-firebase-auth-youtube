import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "@firebase/auth";
import {
  getFirebaseAuth,
  getGoogleProvider,
  loginWithProvider,
} from "./firebase-client";

export const useRedirectAfterLogin = () => {
  const router = useRouter();

  return function () {
    router.push("/");
    router.refresh();
  };
};

export const login = async (token: string) => {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  await fetch("/api/login", {
    method: "GET",
    headers,
  });
};

export async function loginWithCredential(credential: UserCredential) {
  const idToken = await credential.user.getIdToken();

  await login(idToken);
}

export const useSignInWithProviders = () => {
  const redirectAfterLogin = useRedirectAfterLogin();

  const handleGoogleSignIn = async () => {
    const auth = getFirebaseAuth();
    const credential = await loginWithProvider(auth, getGoogleProvider(auth));

    await loginWithCredential(credential);
    redirectAfterLogin();
  };


  return {
    handleGoogleSignIn,
  };
};

export const useSignWithEmail = () => {
  const redirectAfterLogin = useRedirectAfterLogin();

  const signUpWithEmail = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const auth = getFirebaseAuth();
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await loginWithCredential(credential);

    redirectAfterLogin();
  };

  const signInWithEmail = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const auth = getFirebaseAuth();

    const credential = await signInWithEmailAndPassword(auth, email, password);

    await loginWithCredential(credential);
    redirectAfterLogin();
  };

  return {
    signUpWithEmail,
    signInWithEmail,
  };
};
