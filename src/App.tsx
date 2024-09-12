import './App.css'
import UsersTable from './components/usersTable/UsersTable'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from './components/spinner/Spinner'
import { AppDispatch, RootState } from './store'
import { useEffect } from 'react'
import { fetchUsers } from './slices/UsersSlice'
import ErrorMsg from './components/errorMsg/ErrorMsg'
import Footer from './components/footer/Footer'

function App() {
	const dispatch: AppDispatch = useDispatch()
	const { isFetching, error } = useSelector((state: RootState) => state.users)

	useEffect(() => {
		dispatch(fetchUsers())
	}, [dispatch])

	return (
		<>
			<header className="header">
				<h1 className="header-title">Users Table</h1>
			</header>
			{isFetching ? <Spinner /> : error.length ? <ErrorMsg error={error} /> : <UsersTable />}
			<Footer />
		</>
	)
}

export default App
