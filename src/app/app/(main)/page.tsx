import { DashboardPage, DashboardPageHeader, DashboardPageHeaderNav, DashboardPageHeaderTitle, DashboardPageMain } from "@/components/dashboard/page";
import { ToDoDataTable } from "./_components/todo-datatable";
import { TodoUpsertSheet } from "./_components/todo-upsert-sheet";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { getUserTodos } from "./actions";

export default async function Page() {
	const todos = await getUserTodos()
	return (
		<DashboardPage>
			<DashboardPageHeader>
				<DashboardPageHeaderTitle>Tasks</DashboardPageHeaderTitle>
				<DashboardPageHeaderNav>
					<TodoUpsertSheet>
						<Button variant='outline' size='sm'>
							<PlusIcon className="h-4 w-4 mr-3"></PlusIcon>
							Add Todo
						</Button>
					</TodoUpsertSheet>
				</DashboardPageHeaderNav>
			</DashboardPageHeader>
			<DashboardPageMain>
				<ToDoDataTable data={todos} />
			</DashboardPageMain>
		</DashboardPage>
	)
}