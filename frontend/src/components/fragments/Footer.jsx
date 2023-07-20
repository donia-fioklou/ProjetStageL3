import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="footer bg-white py-4 d-flex flex-lg-column" id="kt_footer">
                <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
                    <div className="text-dark order-2 order-md-1">
                        <span className="text-muted font-weight-bold mr-2">2023©</span>
                        <a href="http://keenthemes.com/metronic" target="_blank" rel="noreferrer" className="text-dark-75 text-hover-primary">Keenthemes</a>
                    </div>
                    <div className="nav nav-dark order-1 order-md-2">
                        <a href="http://keenthemes.com/metronic" target="_blank" rel="noreferrer" className="nav-link pr-3 pl-0">About</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;