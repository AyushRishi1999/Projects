import { Component } from 'react';
import ViewBillsService from '../../../../../api/services/ViewBillsService';
import ViewClaimsService from '../../../../../api/services/ViewClaimsService';

class ViewBillsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            memberId: '',
            message: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.viewBillClicked = this.viewBillClicked.bind(this);
    }

    handleChange(event) {
        console.log(event.target.name)
        this.setState({ [event.target.name]: event.target.value })
    }

    viewBillClicked() {
        let memberId = this.state.memberId;
        let token = JSON.parse(window.sessionStorage.getItem('authenticatedUser')).jwtAuthToken;

        ViewBillsService.getBillInfo(memberId, token)
            .then(res => {
                this.props.navigate(`/bill-details/${memberId}`);
            })
            .catch(error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                this.setState({
                    message: resMessage + ", please enter a valid Member Id."
                });
            })

    }

    render() {
        return (
            <div className="listBillsComponent">
                <div>
                    {/* Masthead*/}
                    <header className="masthead" id="our-rooms-header">
                        <div className="container">
                            <div className="masthead-subheading">Please find your bills below</div>
                        </div>
                    </header>
                </div>
                <div id="box">
                    <div className="row-room">
                        <div id="view_bill_id" className="section">
                            <div className="section-center">
                                <div className="container">
                                    <div className="row">
                                        <div className="view-bills-form">
                                            {this.state.message && (
                                                <div className="form-group">
                                                    <div className="alert alert-danger" role="alert">
                                                        {this.state.message} <br />
                                                    </div>
                                                </div>
                                            )}
                                            <form>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <span className="form-label" name="view_bill_id">Member ID</span>
                                                            <input className="form-control" type="text"
                                                                name="memberId" placeholder="Enter member id here" onChange={this.handleChange} required />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="form-btn">
                                                            <button type="button" className="submit-btn" onClick={this.viewBillClicked}>View Bill</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewBillsComponent;