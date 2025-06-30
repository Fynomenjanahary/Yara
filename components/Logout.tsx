"use client";
import { logout } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import * as React from 'react';

const Logout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        await logout();
        router.push("/");
      }}
    >
      {children}
    </Button>
  );
};

export default Logout;
