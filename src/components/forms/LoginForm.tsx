import { AlertCircleIcon, Loader2 } from "lucide-react";

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
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div className='flex flex-col gap-10'>
          <div className='flex flex-col gap-4'>
            <TypingEffect />
          </div>
          <div className='flex flex-col gap-6'>
            <div className='grid gap-3'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='e.g, domains@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {error && (
              <Alert variant='destructive'>
                <AlertCircleIcon />
                <AlertTitle>Error.</AlertTitle>
                <AlertDescription>
                  <p>{error}</p>
                </AlertDescription>
              </Alert>
            )}
            <Button type='submit' className='w-full' disabled={isInProcess}>
              Login {isInProcess ? <Loader2 className='animate-spin' /> : ""}
            </Button>
          </div>
        </div>
      </form>
      <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{" "}
        and <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  );
}
