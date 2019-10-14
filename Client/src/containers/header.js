import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Header extends Component {
 render() {
    return (
    <div className="FlexColumn">
      <div className='FlexRow'>
        React Redux App
        </div>
        <div className="FlexRow">
          <Link to="/" style={{ textDecoration: 'none', padding: '10px', margin: '10px'}}>
              Home
          </Link>

          <Link to="/component1" style={{ textDecoration: 'none', padding: '10px', margin: '10px'}}>
             Protected Route
          </Link>

          <Link to="/posts" style={{ textDecoration: 'none', padding: '10px', margin: '10px'}}>
            Posts
          </Link>

           <Link to="/profile" style={{ textDecoration: 'none', padding: '10px', margin: '10px'}}>
              Profile
           </Link>



          <div style={{marginLeft: 'auto'}}>
          { !this.props.isAuthenticated
            ? <button variant="contained" color="primary" onClick={() => this.props.auth.login()}>
                <span style={{paddingRight: '5px'}}>Login</span> | <span style={{paddingLeft: '5px'}}>Signup</span> </button>
            : <button variant="contained" color="primary" onClick={() => this.props.auth.logout()}> Logout </button>
          }
          </div>
        </div>
      </div>
    )}
}


function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth_reducer.isAuthenticated
    }
}



export default connect(mapStateToProps)(Header);
