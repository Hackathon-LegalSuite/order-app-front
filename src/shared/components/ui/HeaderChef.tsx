import { NavLink } from 'react-router'

type HeaderChefProps = {
	basePath?: string
}

const tabs = [
	{ label: 'Pendientes', path: '', exact: true },
	{ label: 'Entregas', path: 'entregas' },
]

const HeaderChef = ({ basePath = '/orderchef' }: HeaderChefProps) => {
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
