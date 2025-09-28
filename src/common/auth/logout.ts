import { useRouter } from "next/navigation";

export async function logout() {
  const headers: Record<string, string> = {};

  await fetch("/api/logout", {
    method: "GET",
    headers,
  });
}
export const useRedirectAfterLogout = () => {
  const router = useRouter();

  return function () {
    router.push("/");
    router.refresh();
  };
};

export const useLogout = () => {
  const redirect = useRedirectAfterLogout();

  return async () => {
    await logout();
    redirect();
  };
};
