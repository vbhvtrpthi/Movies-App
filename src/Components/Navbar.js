import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
            <div style={{display:'flex'}}>
                
                <Link to="/" style={{textDecoration:'none'}}><h2 style={{ marginLeft: '4rem', marginTop: '1rem' }}>Movies App</h2></Link>
                
                <Link to="/favourites" style={{ textDecoration: 'none' }}><h2 style={{ marginLeft: '4rem', marginTop: '1rem' }}>Favourites</h2></Link>

            </div>
        )
    }
}
