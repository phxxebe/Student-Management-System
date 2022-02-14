import React from 'react';
import pagenotfound from '../assets/images/pagenotfound.jpg';

function PageNotFound() {
    const pagenotfoundstyle={
        backgroundImage: `url(${pagenotfound})`,
        height:'100vh',
        top: '50',
        marginTop:'-70px',
        fontSize:'50px',
        backgroundSize: 'cover',
        backgroundColor: 'white',
        textAlign: 'center'
    };
  return (
      <div style={pagenotfoundstyle}>
          <h2>404: Page Not Found!</h2>
      </div>
    
  )
}

export default PageNotFound;