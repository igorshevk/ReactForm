import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import SignupForm from './Forms/RegisterForm';


const { Content } = Layout;


function Main (props) {
    return (
        <Layout>
            <Content>
                <Router>
                    <Switch>
                        <Route exact={true} path='/' component={SignupForm} />
                        <Route path='/register' component={SignupForm} />
                    </Switch>
                </Router>
            </Content>
        </Layout>
       );
}

export default Main;
