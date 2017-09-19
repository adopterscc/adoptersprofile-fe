import React from 'react';
import Main from './Main';
import {PageHeader} from 'react-bootstrap';
import Footer from './Footer';

class App extends React.Component{
    render(){
        return (
            <div>
                <PageHeader>
                    &nbsp;
                    Adopters.cc
                </PageHeader>
                <Main />
                <Footer />
            </div>
        );
    }
}

export default App;