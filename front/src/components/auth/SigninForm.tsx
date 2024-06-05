"use client";
import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { loginUserAction } from "@/actions/auth-actions";
import { ZodErrors } from "../error/ZodErrors";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StrapiErrors } from "../error/StrapiErrors";
import { useToast } from "../ui/use-toast";

export default function SigninForm() {
  const [formState, formAction] = useFormState(loginUserAction, undefined);
  const status = useFormStatus();
  const { toast } = useToast();

  const checkFormState = async () => {
    if (formState && "zodErrors" in formState) {
      toast({
        variant: "destructive",
        title: `Login failed !`,
        description: (
          <>
            <ZodErrors
              error={
                [
                  formState?.zodErrors?.identifier,
                  formState?.zodErrors?.password,
                ] as string[]
              }
            />
          </>
        ),
      });
    }
    if (formState && "strapiErrors" in formState) {
      toast({
        variant: "destructive",
        title: `Login failed !`,
        description: (
          <>
            <StrapiErrors
              error={formState?.strapiErrors as IStrapiErrorsProps}
            />
          </>
        ),
      });
    }
  };

  useEffect(() => {
    checkFormState();
  }, [formState]);

  return (
    <form className="w-full" action={formAction}>
      <Card>
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
          <CardDescription>ITINOV BANK APP</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="identifier">Identifier</Label>
            <Input
              name={"identifier"}
              type="text"
              placeholder="johndoe@test.fr"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input name={"password"} type="password" placeholder="johndoe" />
          </div>
          <CardFooter className="flex flex-col">
            <Button disabled={status.pending} type="submit">
              Connexion
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </form>
  );
}
