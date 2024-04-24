'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import { Todo } from "../types"
import { useRef } from "react"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { upsertTodo } from "../actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { upsertTodoSchema } from "../schema"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

type TodoUpsertSheetProps = {
	children?: React.ReactNode
	defaultValue?: Todo
}

export function TodoUpsertSheet({ children }: TodoUpsertSheetProps) {
	const ref = useRef<HTMLDivElement>(null)
	const router = useRouter()
	const form = useForm({
		resolver: zodResolver(upsertTodoSchema)
	})

	const onSubmit = form.handleSubmit(async (data) => {
		await upsertTodo(data)
		router.refresh()
		ref.current?.click()
		toast({
			title: "Todo created",
			description: "Your todo has been created successfully.",
		})
	})

	return (
		<Sheet>
			<SheetTrigger asChild>
				<div ref={ref}>{children}</div>
			</SheetTrigger>
			<SheetContent>
				<Form {...form}>
					<form onSubmit={onSubmit} className="space-y-8 h-screen">
						<SheetHeader>
							<SheetTitle>Create todo</SheetTitle>
							<SheetDescription>
								Add or edit your todo item here. Click "Save changes" when you're done.
							</SheetDescription>
						</SheetHeader>

						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="Write your todo title here" {...field} />
									</FormControl>
									<FormDescription>
										This is your public display name.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<SheetFooter>
							<Button type="submit">Save changes</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}
