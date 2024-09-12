import { useEffect, useMemo, useState } from 'react'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters, UserType } from '../../slices/UsersSlice'
import Table from '../table/Table'

export default function UsersTable() {
	const dispatch: AppDispatch = useDispatch()
	const { filteredUsers } = useSelector((state: RootState) => state.users)
	const [data, setData] = useState<UserType[]>((filteredUsers as UserType[]) || [])
	type FilterType = { [key in 'name' | 'username' | 'email' | 'phone']: string }
	const [filters, setFiltersState] = useState<FilterType>({ name: '', username: '', email: '', phone: '' })

	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })

	useEffect(() => {
		setData(filteredUsers)
	}, [filteredUsers])

	const handleFilterChange = (filterName: string, value: string) => {
		dispatch(setFilters({ ...filters, [filterName]: value }))
		setFiltersState(prev => ({
			...prev,
			[filterName]: value,
		}))
	}

	const columns = useMemo(
		() => [
			{
				header: 'Name',
				accessorKey: 'name',
				cell: ({ row }: { row: { original: UserType } }) => {
					return <div className="">{row.original.name}</div>
				},
			},
			{
				header: 'Username',
				accessorKey: 'username',
				cell: ({ row }: { row: { original: UserType } }) => {
					return <div className="">{row.original.username}</div>
				},
			},
			{
				header: 'Email',
				accessorKey: 'email',
				cell: ({ row }: { row: { original: UserType } }) => {
					return <div className="">{row.original.email.toLowerCase()}</div>
				},
			},
			{
				header: 'Phone',
				accessorKey: 'phone',
				cell: ({ row }: { row: { original: UserType } }) => {
					return <div className="">{row.original.phone}</div>
				},
			},
		],
		[]
	)

	return (
		<div className="row px-5">
			<Table
				data={data}
				filters={filters}
				onFilterChange={handleFilterChange}
				pagination={pagination}
				setPagination={setPagination}
				columns={columns}
			/>
		</div>
	)
}
