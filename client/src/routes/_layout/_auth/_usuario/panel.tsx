import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/_auth/_usuario/panel")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Panel Principal</h1>
				<p className="text-muted-foreground mt-2">Bienvenido! Este es tu panel principal</p>
			</div>
		</div>
	)
}
