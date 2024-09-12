import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export type UserType = {
	id: number
	name: string
	username: string
	email: string
	phone: string
}

type UsersState = {
	users: UserType[]
	filteredUsers: UserType[]
	isFetching: boolean
	error: string
}

const initialState: UsersState = {
	users: [],
	filteredUsers: [],
	isFetching: false,
	error: '',
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users')
	return await response.json()
})

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setFilters: (state, action) => {
			const { name, username, email, phone } = action.payload

			state.filteredUsers = state.users
				.filter((user: UserType) => {
					let isNameMatch = true
					let isUsernameMatch = true
					let isEmailMatch = true
					let isPhoneMatch = true

					if (name) {
						isNameMatch = user.name.toLowerCase().includes(name.toLowerCase())
					}

					if (username) {
						isUsernameMatch = user.username.toLowerCase().includes(username.toLowerCase())
					}

					if (email) {
						isEmailMatch = user.email.toLowerCase().includes(email.toLowerCase())
					}

					if (phone) {
						isPhoneMatch = user.phone.includes(phone)
					}

					return isNameMatch && isUsernameMatch && isEmailMatch && isPhoneMatch
				})
				.sort((a: UserType, b: UserType) => a.name.localeCompare(b.name))
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.isFetching = true
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.users = action.payload
				state.filteredUsers = state.users.sort((a, b) => a.name.localeCompare(b.name))
				state.isFetching = false
				state.error = ''
			})
			.addCase(fetchUsers.rejected, (state) => {
				state.isFetching = false
				state.error = 'Failed to fetch users'
			})
	},
})

export const { setFilters } = usersSlice.actions
export default usersSlice.reducer
