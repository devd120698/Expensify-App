// Higher Order Component - A component that renders another component
// Reuse code
// Render hijacking
// Prop manipulation

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The Info is {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info.</p>}
            <WrappedComponent {...props} />
        </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ?
                <WrappedComponent {...props} />
                : <p>Please Login</p>
            }
        </div>
    );
};
const AuthInfo = requireAuthentication(Info);
const AdminInfo = withAdminWarning(Info);

//ReactDOM.render(<AdminInfo isAdmin={true} info="Details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info="Details"/>, document.getElementById('app'));