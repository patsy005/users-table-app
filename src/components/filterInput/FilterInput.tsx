import { useState } from 'react'
import { ExitIconSmall } from '../../ui/icons/Icons'

import { Header } from '@tanstack/react-table'

interface FilterInputProps<T> {
	header: Header<T, unknown>

	filters: { [key: string]: string }

	onFilterChange: (id: string, value: string) => void
}

export default function FilterInput<T>({ header, filters, onFilterChange }: FilterInputProps<T>) {
	const [search, setSearch] = useState('')

	const onFilterChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
		onFilterChange(header.column.id, e.target.value)
	}

	const onFilterClearHandler = () => {
		setSearch('')
		onFilterChange(header.column.id, '')
	}

	return (
		<div className="table__search-input-container">
			{search !== '' && <ExitIconSmall onClick={onFilterClearHandler} />}
			<input
				className="table__search-input"
				type="text"
				value={filters[header.column.id] || ''}
				onChange={onFilterChangeHandler}
				placeholder={`Filter by ${header.column.columnDef.header}`}
			/>
		</div>
	)
}
