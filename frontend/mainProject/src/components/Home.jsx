import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card text-center">
            <div className="card-header">
              HOME PAGE
            </div>
            <div className="card-body">
              <blockquote className="blockquote mb-0">
                <p className="text-center">A well-known quote, contained in a blockquote element.</p>
                <footer className="blockquote-footer text-center">Someone famous in <cite title="Source Title">Source Title</cite></footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
