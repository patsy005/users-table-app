import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable, ColumnDef } from '@tanstack/react-table'
import { LineIcon, NextIcon, PrevIcon } from '../../ui/icons/Icons'
import FilterInput from '../filterInput/FilterInput'

interface TableProps<T> {
	data: T[]
	columns: ColumnDef<T, unknown>[]
	filters: { [key: string]: string }
	onFilterChange: (filterName: string, value: string) => void
	pagination: {
		pageIndex: number
		pageSize: number
	}
	setPagination: React.Dispatch<
		React.SetStateAction<{
			pageIndex: number
			pageSize: number
		}>
	>
}

export default function Table<T>({ data, columns, filters, onFilterChange, pagination, setPagination }: TableProps<T>) {
	const table = useReactTable({
		data,
		columns,
		state: {
			pagination,
		},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
	})

	return (
		<div className={`col-12 overflow-x-scroll mt-5 table-container p-0`}>
			<table className="table table-hover">
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th key={header.id}>
									{flexRender(header.column.columnDef.header, header.getContext())}
									<div className="search-filter-container">
										<FilterInput header={header} filters={filters} onFilterChange={onFilterChange} />
									</div>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{data.length === 0 ? (
						<tr>
							<td colSpan={columns.length} style={{ textAlign: 'center', color: '#091F42' }}>
								No users found for the provided filters. Please try again with different filters.
							</td>
						</tr>
					) : (
						table.getRowModel().rows.map(row => (
							<tr key={row.id}>
								{row.getVisibleCells().map(cell => (
									<td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
								))}
							</tr>
						))
					)}
				</tbody>
			</table>
			{Object.keys(table.getRowModel().rowsById).length > 5 && (
				<div className="pagination-row">
					<p className="pagination-info">
						Page <span>{table.getState().pagination.pageIndex + 1}</span> of <span>{table.getPageCount()}</span>
					</p>
					<div className="pagination-btns">
						<div className="pagination-btns__group">
							<button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
								<PrevIcon />
								<span>Previous</span>
							</button>
						</div>
						<LineIcon />
						<div className="pagination-btns__group">
							<button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
								<span>Next</span>
								<NextIcon />
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
