'use client'

import {
	DashboardSidebar,
	DashboardSidebarHeader,
	DashboardSidebarMain,
	DashboardSidebarNav,
	DashboardSidebarNavMain,
	DashboardSidebarNavLink,
	DashboardSidebarNavHeader,
	DashboardSidebarNavHeaderTitle,
	DashboardSidebarFooter
} from "@/components/dashboard/sidebar";
import { HomeIcon, MixerVerticalIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { UserDropdown } from "./user-dropdown";
import { Logo } from "@/components/logo";
import { Session } from "next-auth";

type MainSidebarProps = {
	user: Session['user']
}

export function MainSidebar({ user }: MainSidebarProps) {
	const pathname = usePathname()

	function isActive(path: string) {
		return pathname === path
	}

	return (
		<DashboardSidebar>
			<DashboardSidebarHeader>
				<Logo />
			</DashboardSidebarHeader>
			<DashboardSidebarMain className="flex flex-col flex-grow">
				<DashboardSidebarNav>
					<DashboardSidebarNavMain>
						<DashboardSidebarNavLink href="/app" active={isActive('/app')}>
							<HomeIcon className="w-3 h-3 mr-3" />
							Tasks
						</DashboardSidebarNavLink>
						<DashboardSidebarNavLink href="/app/settings" active={isActive('/app/settings')}>
							<MixerVerticalIcon className="w-3 h-3 mr-3" />
							Settings
						</DashboardSidebarNavLink>
					</DashboardSidebarNavMain>
				</DashboardSidebarNav>
				<DashboardSidebarNav className="mt-auto">
					<DashboardSidebarNavHeader>
						<DashboardSidebarNavHeaderTitle>
							Extra Links
						</DashboardSidebarNavHeaderTitle>
					</DashboardSidebarNavHeader>
					<DashboardSidebarNavMain>
						<DashboardSidebarNavLink href="/">Help</DashboardSidebarNavLink>
						<DashboardSidebarNavLink href="/">Site</DashboardSidebarNavLink>
					</DashboardSidebarNavMain>
				</DashboardSidebarNav>
			</DashboardSidebarMain>
			<DashboardSidebarFooter>
				<UserDropdown user={user} />
			</DashboardSidebarFooter>
		</DashboardSidebar>
	)
}