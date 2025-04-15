import { Link, useLocation } from "@tanstack/react-router"
import { Home } from "lucide-react"

import { cn } from "../lib/utils"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "./ui/sidebar"

const items = [
	{
		title: "Panel Principal",
		url: "/panel",
		icon: Home,
	},
]

export function AppSidebar() {
	const { pathname } = useLocation()
	return (
		<Sidebar className="bg-slate-50 p-4">
			<SidebarContent>
				<SidebarGroup />
				<SidebarGroupLabel>The Circular Hub</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						<SidebarMenuItem className="grid w-full gap-2">
							{items.map((item) => (
								<SidebarMenuButton
									key={item.title}
									className={cn(
										"w-full justify-start",
										pathname === item.url && "bg-muted font-medium",
									)}
									variant={pathname === item.url ? "outline" : "default"}
									asChild>
									<Link to={item.url}>
										<item.icon />
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							))}
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroupContent>
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	)
}
