import React from 'react'

function Banner() {
  return (
    <>
    {/* <!-- end of .container-->*/}
    <section
        className="py-0"
        id="header"
        style={{ marginTop: '-23rem' }}
      >
        <div className="container">
          <div className="row g-0">
            <div className="col-md-6">
              <div className="card card-span h-100 text-white">
                <img className="img-fluid" src="assets/img/gallery/her.png" width="790" alt="For Her" />
                <div className="card-img-overlay d-flex flex-center">
                  <a className="btn btn-lg btn-light" href="#!">For Her</a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card card-span h-100 text-white">
                <img className="img-fluid" src="assets/img/gallery/him.png" width="790" alt="For Him" />
                <div className="card-img-overlay d-flex flex-center">
                  <a className="btn btn-lg btn-light" href="#!">For Him</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* <!-- end of .container-->*/}
    </>
  )
}

export default Banner
