export default function Plans() {
    return (
        <div className='row mt-5 g-5 justify-content-center align-items-center' id="Plans">
            <div className="col-12 col-md-8 col-lg-4">
                <div className="d-flex flex-column justify-content-between plan">
                    <div>
                        <h3>Monthly Plan</h3>
                        <p className="mt-2">399.00 EGP/month</p>
                    </div>
                    <p className="charge">Charged monthly</p>
                </div>
            </div>
            <div className="col-12 col-md-8 col-lg-4">
                <div className="d-flex flex-column justify-content-between plan">
                    <div>
                        <h3>Quarterly Plan</h3>
                        <p className="mt-2">266.33 EGP/month</p>
                    </div>
                    <p className="charge">Charged every 3 months as a payment of 799 EGP</p>
                </div>
            </div>
            <div className="col-12 col-md-8 col-lg-4">
                <div className="d-flex flex-column justify-content-between plan">
                    <div>
                        <h3>Yearly Plan</h3>
                        <p className="mt-2">199.92 EGP/month</p>
                    </div>
                    <p className="charge">Charged as annual payment of 2,399 EGP</p>
                </div>
            </div>
        </div>
    )
}
