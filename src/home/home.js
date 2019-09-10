import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import FileUpload from './fileupload';

import PrivacyDashboard from './privacyDashboard';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        //   this.deleteActivity = this.deleteActivity.bind(this);
        //   this.editActivity = this.editActivity.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {

        // let activities =activityCache.getAll();

        console.log("in perstab render");
        // console.log(activities);
        return (
            <div>
                {/* <CreateItem addActivity={this.addActivity} userid={this.props.match.params.userid}/> */}
                <br/>
                <Nav tabs>
                    <NavItem className={this.state.activeTab === '1' ? 'active' : ''}>
                        <NavLink
                            onClick={() => { this.toggle('1'); }}
                        >
                            Data Upload
                </NavLink>
                    </NavItem>
                    <NavItem className={this.state.activeTab === '2' ? 'active' : ''}>
                        <NavLink
                            onClick={() => { this.toggle('2'); }}
                        >
                            Privacy Dashboard
                </NavLink>
                    </NavItem>
                    <NavItem className={this.state.activeTab === '3' ? 'active' : ''}>
                        <NavLink
                            onClick={() => { this.toggle('3'); }}
                        >
                            Profile
                </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                            
                            <FileUpload curuser={this.props.curuser}/>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                    
                        <Row>
                            <Col sm="12">
                                
                                <PrivacyDashboard curuser={this.props.curuser}/>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                    
                        <Row>
                            <Col sm="12">
                                <h1 align="center">This is heading 3</h1>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}