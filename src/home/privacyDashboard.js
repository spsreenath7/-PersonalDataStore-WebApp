import React from 'react';
import { Collapse, Timeline, Icon, Modal, Tag } from 'antd';
import axios from 'axios';
import TransList from './financePreview';

export default class PrivacyDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.updateFinancePrivacy = this.updateFinancePrivacy.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //   this.deleteActivity = this.deleteActivity.bind(this);
        //   this.editActivity = this.editActivity.bind(this);
        this.state = {
            visible: false,
            financezone: '',
            financesetting: '',
            financecount: 52,
            financePreview: [{ "currency": "EUR", "transdate": "16-05-2019", "transid": "f7e895fb", "amount": "10.00", "user": "dfdhjk37ghhzx57", "vendor": "LYCAMOBILE", "transtype": "Purchase" }, { "currency": "EUR", "transdate": "28-05-2019", "serviceprovider": "HDFC bank", "transid": "057f2fad", "amount": "1.49", "user": "dfdhjk37ghhzx57", "vendor": "MR PRICE", "transtype": "Purchase" }, { "currency": "EUR", "transdate": "09-05-2019", "transid": "7b804e9f", "amount": "8.33", "user": "dfdhjk37ghhzx57", "vendor": "TESCO STORE", "transtype": "Purchase" }],
            // financePreview:[],
            shopCount: 12,
            shopPreview: [],
            rawfinances: [],
            rawpurchases: [],
            rawtravels: []
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(e.target.name + ' : ' + e.target.value);
    }

    async componentDidMount() {
        this._isMounted = true
        console.log("Inside component mount");
        try {
            const resp = await axios.post('https://dqs9ai9qb4.execute-api.eu-west-1.amazonaws.com/privacy/pds', {
                // userid: `pdlrz${username}`,
                username: this.props.curuser,
                table: 'PDS_GZ_FinanceData'
            });
            if (this._isMounted) {
                console.log("resp.data.finance : " + resp.data.finance[0].url);
                this.setState({
                    rawfinances: resp.data.finance,
                    rawpurchases: resp.data.shopping,
                    rawtravels: resp.data.travels
                });
            }

        } catch (e) {
            if (this._isMounted) this.setState({

            });
        }
    };

    showModal = async () => {
        let resp = await axios.post('https://dqs9ai9qb4.execute-api.eu-west-1.amazonaws.com/privacy/erasure', {
            // userid: `pdlrz${username}`,
            username: this.props.curuser,
            table: 'PDS_GZ_FinanceData'
        });
        console.log("printing .." + resp.data.count);
        console.log("printing .." + resp.data.transactions.length);
        //   var transactions = [resp.data.transactions[0],resp.data.transactions[1],resp.data.transactions[2]];
        //   transactions = resp.data.transactions
        this.setState({
            visible: true,
            financecount: resp.data.count,
            financePreview: resp.data.transactions
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    updateFinancePrivacy = (e) => {
        e.preventDefault();
        let selectedZone = this.state.financezone;
        let privacySetting = this.state.financesetting;
        let user = this.props.curuser;
        if (privacySetting === "erasure") {
            const resp = axios.post('https://dqs9ai9qb4.execute-api.eu-west-1.amazonaws.com/privacy/erasure', {
                // userid: `pdlrz${username}`,
                username: user,
                zone: selectedZone,
                privacy: privacySetting
            });
        } else {

        }


    };


    render() {

        const { Panel } = Collapse;

        const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

        // let activities =activityCache.getAll();

        // console.log("in perstab render");
        // console.log(activities);
        return (
            <div>
                <Collapse accordion>
                    <Panel header="Finance transactions" key="1">

                        <div>
                            <form class="form-inline">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="my-1 mr-2" for="inlineFormCustomSelectPref" >Select zone :</label>
                                <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" onChange={this.handleChange} id="financezone" name="financezone">
                                    <option value={this.state.financezone}>Choose...</option>
                                    <option value="raw">Raw</option>
                                    <option value="gold">Consolidated</option>
                                    <option value="work">Work zone</option>
                                </select>

                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="my-1 mr-2" for="inlineFormCustomSelectPref">Select privacy :</label>
                                <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" onChange={this.handleChange} id="financesetting" name="financesetting">
                                    <option value={this.state.financesetting}>Choose...</option>
                                    <option value="consent">Offer consent</option>
                                    <option value="withdraw">Withdraw consent</option>
                                    <option value="erasure">Perform erasure</option>
                                </select>

                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="submit" class="btn btn-primary my-1" onClick={this.updateFinancePrivacy}>Save</button>

                            </form>
                        </div>
                        <hr></hr>


                        <Timeline>
                            <Timeline.Item>
                                <h4>Raw data</h4> <div><Tag color="green">In-Consent</Tag></div>
                                {this.state.rawfinances.length > 0 ? (
                                    <div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<a href={this.state.rawfinances[0].url} target="_blank" rel="noopener noreferrer">{this.state.rawfinances[0].name}</a>
                                    <br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<a href={this.state.rawfinances[1].url} target="_blank" rel="noopener noreferrer">{this.state.rawfinances[1].name}</a>
                                    </div>
                                ) : null}

                            </Timeline.Item>
                            <Timeline.Item>
                                <h4>Consolidated data</h4> <div><Tag color="green">In-Consent</Tag></div>
                                <div>
                                &nbsp;&nbsp;&nbsp;&nbsp;<p>Anonymised Transaction data (click to preview) <Icon type="eye" onClick={this.showModal} />
                                    <Modal
                                        title="Preview of Gold zone data"
                                        visible={this.state.visible}
                                        onOk={this.handleOk}
                                        onCancel={this.handleCancel}
                                    >
                                        <div>
                                            <TransList financecount={this.state.financecount} financePreview={this.state.financePreview} />
                                        </div>
                                        {/* <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">First</th>
                                                    <th scope="col">Last</th>
                                                    <th scope="col">Handle</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>Larry</td>
                                                    <td>the Bird</td>
                                                    <td>@twitter</td>
                                                </tr>
                                            </tbody>
                                        </table> */}
                                    </Modal>
                                </p>
                                </div>

                            </Timeline.Item>

                            <Timeline.Item><h4>Work zone data</h4><div><Tag color="green">In-Consent</Tag></div></Timeline.Item> 

                        </Timeline>


                    </Panel>
                    <Panel header="Travel data" key="2">
                        <Timeline>
                            <Timeline.Item><h2>Raw data</h2></Timeline.Item>
                            <Timeline.Item><h2>Consilated data</h2></Timeline.Item>
                            <Timeline.Item><h2>Work zone data</h2></Timeline.Item>
                        </Timeline>
                    </Panel>
                    <Panel header="Shopping data" key="3">
                        <Timeline>

                            <Timeline.Item><h2>Raw data</h2></Timeline.Item>
                            <Timeline.Item><h2>Consilated data</h2></Timeline.Item>
                            <Timeline.Item><h2>Work zone data</h2></Timeline.Item>
                        </Timeline>
                    </Panel>
                </Collapse>
            </div>
        );
    }
}