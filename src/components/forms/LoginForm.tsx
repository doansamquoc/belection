import {
  AlertCircleIcon,
  CircleAlert,
  Code2,
  Loader2,
  Mail,
  Shield,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { magic } from "@/lib/magic";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useNavigate } from "react-router-dom";
import TypingEffect from "../TypingEffect";
import { useAuth } from "@/contexts/AuthContext";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [isInProcess, setInProcess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  async function handleLogin() {
    try {
      setInProcess(true);
      setError("");
      await magic.auth.loginWithMagicLink({
        email: email,
      });

      await fetchUser();
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Login failed! Please try again later.");
    } finally {
      setInProcess(false);
    }
  }

  const isValidEmail = email.includes("@") && email.includes(".");

  return (
    <div className={cn("flex flex-col gap-8", className)} {...props}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className='space-y-8'
      >
        <div className='space-y-6'>
          <div className='text-center space-y-2'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4'>
              <Code2 className='w-8 h-8 text-primary' />
            </div>
            <TypingEffect />
            <p className='text-sm text-muted-foreground max-w-md mx-auto'>
              Access your secure blockchain voting dashboard with passwordless
              authentication
            </p>
          </div>
        </div>

        <div className='space-y-6'>
          <div className='space-y-3'>
            <Label
              htmlFor='email'
              className='text-base font-medium flex items-center gap-2'
            >
              <Mail className='w-4 h-4' />
              Email Address
            </Label>
            <div className='relative'>
              <Input
                id='email'
                type='email'
                placeholder='Enter your email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='text-base py-3 px-4 pr-10 border-2 focus:ring-2 focus:ring-primary/20 transition-all duration-200'
                required
              />
              <div className='absolute right-3 top-1/2 -translate-y-1/2'>
                {email && (
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors duration-200",
                      isValidEmail ? "bg-green-500" : "bg-red-500"
                    )}
                  />
                )}
              </div>
            </div>
            <p className='text-xs text-muted-foreground flex items-center gap-1'>
              <CircleAlert className='w-3 h-3' />
              We'll send you a secure magic link to sign in
            </p>
          </div>

          {error && (
            <Alert variant='destructive' className='border-2'>
              <AlertCircleIcon className='h-4 w-4' />
              <AlertTitle>Authentication Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type='submit'
            className='w-full py-3 text-base font-medium relative overflow-hidden group'
            disabled={isInProcess || !isValidEmail}
          >
            <div className='flex items-center justify-center gap-2'>
              {isInProcess ? (
                <>
                  <Loader2 className='w-4 h-4 animate-spin' />
                  Sending Magic Link...
                </>
              ) : (
                <>
                  <Mail className='w-4 h-4' />
                  Send Magic Link
                </>
              )}
            </div>
          </Button>

          {isInProcess && (
            <div className='bg-primary/5 border border-primary/20 rounded-lg p-4'>
              <div className='flex items-start gap-3'>
                <div className='p-1 bg-primary/10 rounded-full'>
                  <Mail className='w-4 h-4 text-primary' />
                </div>
                <div className='space-y-1'>
                  <p className='text-sm font-medium'>Check your email</p>
                  <p className='text-xs text-muted-foreground'>
                    We've sent a secure login link to <strong>{email}</strong>.
                    Click the link to complete your authentication.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>

      <div className='space-y-4'>
        <div className='flex items-center justify-center gap-2 text-xs text-muted-foreground bg-muted/30 rounded-lg py-2 px-4'>
          <Shield className='w-3 h-3' />
          <span>Secured by Magic Link authentication</span>
        </div>

        <div className='text-center text-xs text-muted-foreground text-balance'>
          By continuing, you agree to our{" "}
          <a
            href='#'
            className='text-foreground hover:text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary transition-colors duration-200'
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href='#'
            className='text-foreground hover:text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary transition-colors duration-200'
          >
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </div>
  );
}
