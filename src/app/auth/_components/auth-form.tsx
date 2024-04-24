'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"

export function AuthForm() {

	const form = useForm()
	const handleSubmit = form.handleSubmit(async (data) => {
		try {
			await signIn('nodemailer', { email: data.email, redirect: false })
			toast({
				title: "Magic link sent",
				description: "Check your email for the magic link to login",
			})
		} catch (error) {
			toast({
				title: "Error",
				description: "An error ocurred.",
			})
		}
	})

	return (
		<div className="flex flex-col items-center space-y-4 h-screen justify-center">
			<div className="text-center space-y-2">
				<h1 className="text-3xl font-bold">Authentication</h1>
				<p className="text-sm text-gray-500 dark:text-gray-400">Enter your email below to login to your account</p>
			</div>
			<form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						placeholder="Email"
						required
						type="email"
						{...form.register('email')}
					/>
					<Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
						{form.formState.isSubmitting ? 'Sending...' : 'Send Magic Link'}
					</Button>
				</div>
			</form>
		</div>
	)
}

