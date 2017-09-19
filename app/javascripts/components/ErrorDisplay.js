import React from 'react';
import {Alert} from 'react-bootstrap';

class ErrorDisplay extends React.Component{
    render(){
        return (
            <div
                className="container">
                <div
                    className="row">
                    <div
                        className="col-lg-6 col-lg-offset-3">
                        <Alert
                            bsStyle="danger" >
                            <h2>Error!</h2>
                            <p>
                                {this.props.message}
                            </p>
                        </Alert>
                    </div>
                </div>
            </div>
        );
    }
}
export default ErrorDisplay;