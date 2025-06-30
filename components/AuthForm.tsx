"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createAccount, login } from "@/lib/actions/user.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import OTPModal from "./OTPModal";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) => {
  return z.object({
    email: z.string().email(),
    password: z.string().min(8).max(200),
    confirm_password:
      type === "sign-in" ? z.string().optional() : z.string().min(8).max(200),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState("");

  const router = useRouter()
  const schema = authFormSchema(type);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setIsLoading(true);
    setErrorMessage("");

    if (type === "sign-up") {
      try {
        const res = await createAccount({
          email: values.email,
          password: values.password,
        });

        if (res.success) {
          setUserId(res.value);
        } else {
          form.setError(res.field as "email" | "password", {
            type: "manual",
            message: res.message,
          });
        }
      } catch {
        setErrorMessage("Erreur lors de la création.");
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const token = await login({
          email: values.email,
          password: values.password,
        });

        if (token) {
          // Optionally decode token (client-side) to get role
          const payload = JSON.parse(atob(token.split(".")[1]));
          const role = payload.roles?.[0];

          console.log(role);

          // Redirect based on role
          switch (role) {
            case "admin":
              router.push("/admin/dashboard");
              break;
            case "supplier":
              router.push("/supplier/dashboard");
              break;
            case "client":
              router.push("/client/dashboard");
              break;
            default:
              router.push("/");
          }
        }
      } catch (err) {
        setErrorMessage((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title text-center">
            {type === "sign-in" ? "Connection" : "Inscription"}
          </h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Entrez votre email"
                      {...field}
                      className="shad-input"
                    />
                  </FormControl>
                </div>

                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">
                    Mot de passe
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Entrez votre mot de passe"
                      {...field}
                      className="shad-input"
                      type="password"
                    />
                  </FormControl>
                </div>

                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />
          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label">
                      Confirmez votre mot de passe
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Entrez votre mot de passe"
                        {...field}
                        className="shad-input"
                        type="password"
                      />
                    </FormControl>
                  </div>

                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}
          <Button type="submit" className="form-submit-button">
            {type === "sign-in" ? "Se connecter" : "S'inscrire"}
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>
          {errorMessage && <p className="error-message">*{errorMessage}</p>}

          <div className="body-2 flex justify-center">
            <p className="text-light-100">
              {type === "sign-in"
                ? "Pas encore de compte ?"
                : "Déjà un compte ?"}
              <Link
                href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                className="ml-1 font-medium text-brand"
              >
                {type === "sign-in" ? "S'inscrire" : "Se connecter"}
              </Link>
            </p>
          </div>
        </form>
      </Form>
      {/* OTP Verification */}

      {userId && (
        <OTPModal email={form.getValues("email")} accountId={userId} />
      )}
    </>
  );
};

export default AuthForm;
