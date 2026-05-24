import { NavLink } from 'react-router'
import { useChefAuthStore } from '@store/chefAuthStore.ts'

type HeaderChefProps = {
	basePath?: string
}

const allTabs = [
	{ label: 'Pendientes', path: '', exact: true, roles: ['COCINERO'] },
	{ label: 'Entregas', path: 'entregas', exact: false, roles: ['MESERO'] },
]

const HeaderChef = ({ basePath = '/orderchef' }: HeaderChefProps) => {
	const rol = useChefAuthStore((state) => state.auth?.rol)
	const tabs = allTabs.filter((tab) => !rol || tab.roles.includes(rol))

	return (
		<div className="flex gap-5">
			{tabs.map((tab) => {
				const to = tab.path ? `${basePath}/${tab.path}` : basePath

				return (
					<NavLink
						key={tab.label}
						to={to}
						{...(tab.exact ? { end: true } : {})}
						className={({ isActive }) =>
							`text-2xl border-b-2 transition-colors ${
								isActive
									? 'border-item text-item'
									: 'border-transparent text-primary hover:text-item'
								}`
						}
					>
						{tab.label}
					</NavLink>
				)
			})}
		</div>
	)
}

export default HeaderChef
