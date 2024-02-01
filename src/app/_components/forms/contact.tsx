'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Send } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import Balancer from 'react-wrap-balancer'
import { z } from 'zod'
import { toast } from 'sonner'

const contactSchema = z.object({
  name: z.string().min(1, 'The name field is required'),
  email: z.string().min(1, 'The email is required').email(),
  message: z.string().min(1, 'The message field is required'),
  phoneNumber: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
export default function ContactForm() {
  const contactForm = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      phoneNumber: '',
    },
  })
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  const onSubmit = async (values: ContactFormData) => {
    await sleep(1000)
    console.log(values)
    toast.success('Contact form was submitted successfully', {
      position: 'top-right',
      closeButton: true,
      description: 'We will contact you soon. Please check your mail box!',
    })
  }

  const isSubmitting = contactForm.formState.isSubmitting
  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold uppercase">
          Contact form
        </CardTitle>
        <CardDescription>
          <Balancer>Send contact information to me</Balancer>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 ">
        <Form {...contactForm}>
          <form
            noValidate
            className="space-y-4"
            onSubmit={contactForm.handleSubmit(onSubmit)}
          >
            <FormField
              name="name"
              control={contactForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      type="text"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Your name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Phone number"
                      type="tel"
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
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your message here."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please fill the message above
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex-column flex w-full justify-center md:flex-row">
              <Button
                className="w-full gap-2 md:max-w-sm"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : <Send />}
                Send contact information
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
