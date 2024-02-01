'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import Balancer from 'react-wrap-balancer'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Link from 'next/link'

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/

const loginSchema = z.object({
  email: z.string().min(1, 'The email is required').email(),
  password: z
    .string()
    .min(1, 'The password is required')
    .min(8, 'The password must least at 8 characters')
    .refine(
      (value: string) => PASSWORD_REGEX.test(value),
      'The password must include character, number and special symbol',
    ),
})

export type LoginFormData = z.infer<typeof loginSchema>

export default function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')! || '/'

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onSubmit = (values: LoginFormData) => {
    console.log(values)
  }

  return (
    <Card className="mx-auto">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          <Balancer>
            Enter your email and password to login to your account
          </Balancer>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Form {...loginForm}>
          <form
            noValidate
            onSubmit={loginForm.handleSubmit(onSubmit)}
            className="space-y-2"
          >
            <FormField
              name="email"
              control={loginForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@email.com"
                      type="email"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The email must include @ symbol and valid domain
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={loginForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="password"
                      type="password"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The password must least at 8 characters and include
                    character, number and special symbol
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Login
            </Button>
          </form>
        </Form>
        <div className="space-y-4">
          <Label className="block text-center uppercase">
            Or continue with
          </Label>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => signIn('auth0', { callbackUrl: callbackUrl })}
            >
              <Image
                priority
                src="/images/logos/auth0.svg"
                height={24}
                width={24}
                alt="Auth0 logo"
              />
              Auth0
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => signIn('google', { callbackUrl: callbackUrl })}
            >
              <Image
                priority
                src="/images/logos/google.svg"
                height={24}
                width={24}
                alt="Google logo"
              />
              Google
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => signIn('facebook', { callbackUrl: callbackUrl })}
            >
              <Image
                priority
                src="/images/logos/facebook.svg"
                height={24}
                width={24}
                alt="Facebook logo"
              />
              Facebook
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          <Label className='text-sm'>
            By clicking continue, you agree to our{' '}
            <Link
              href="/term-of-service"
              className="underline-offset-2 transition hover:underline"
            >
              Terms of service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy-policy"
              className="underline-offset-2 transition hover:underline"
            >
              Privacy policy
            </Link>
            .
          </Label>
        </div>
      </CardContent>
    </Card>
  )
}
