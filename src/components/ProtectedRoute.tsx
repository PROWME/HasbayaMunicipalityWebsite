"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ImSpinner2 } from "react-icons/im";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ImSpinner2 className="animate-spin text-mossGreen" size={40} />
      </div>
    );
  }

  return <>{children}</>;
}
