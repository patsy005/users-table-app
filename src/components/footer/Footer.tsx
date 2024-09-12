export default function Footer() {
	const getYear = () => {
		const date = new Date()
		return date.getFullYear()
	}

	return (
		<div className="footer mt-5">
			<p>
				&copy; <span className="footer__year">{getYear()}</span> Patrycja Zawadzka. All rights reserved
			</p>
		</div>
	)
}
