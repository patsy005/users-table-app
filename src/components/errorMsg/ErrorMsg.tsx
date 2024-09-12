export default function ErrorMsg({ error }: { error: string }) {
	return (
		<div className="col-12 d-flex align-items-center justify-content-center h-100">
			<div className="error-container col-12 col-md-6 col-lg-4">
				<p className="error-message">{error}</p>
			</div>
		</div>
	)
}
