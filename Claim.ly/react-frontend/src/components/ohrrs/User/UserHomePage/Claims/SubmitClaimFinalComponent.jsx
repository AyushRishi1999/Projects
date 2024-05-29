import { Component } from 'react';

import ViewBillsService from "../../../../../api/services/ViewBillsService";
import PolicyService from "../../../../../api/services/PolicyService";
import ClaimsService from '../../../../../api/services/ClaimsService';

class SubmitClaimFinalComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {

            hospitalsList: [],
            benefitsList: [],

            memberId: this.props.params.memberId,
            policyId: '',
            hospitalId: '',
            benefitId: '',
            claimAmount: '',
            remarks: '',

            claimId: '',
            message: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitClaimClicked = this.submitClaimClicked.bind(this);
    }

    componentDidMount() {

        let token = JSON.parse(window.sessionStorage.getItem('authenticatedUser')).jwtAuthToken;
        ViewBillsService.getBillInfo(this.state.memberId, token)
            .then((response) => {
                console.log("GetBills --------->", response.data)
                this.setState({ policyId: response.data.policyId });

                PolicyService.getHospitalsInfo(this.state.policyId, token)
                    .then(res => {
                        this.setState({ hospitalsList: res.data.providers });
                        console.log("hospitals ---> ", this.state.hospitalsList);
                    })

                PolicyService.getBenefitsInfo(this.state.policyId, this.state.memberId, token)
                    .then(resp => {
                        this.setState({ benefitsList: resp.data.benefits });
                        console.log("benefits ---> ", this.state.benefitsList);
                    })
            })
    }

    handleChange(event) {
        console.log(event.target.name)
        this.setState({ [event.target.name]: event.target.value })
        console.log("value --> ", event.target.value)
    }

    submitClaimClicked() {

        let token = JSON.parse(window.sessionStorage.getItem('authenticatedUser')).jwtAuthToken;

        let claim = {
            memberId: this.state.memberId,
            policyId: this.state.policyId,
            hospitalId: this.state.hospitalId,
            benefitId: this.state.benefitId,
            claimAmount: this.state.claimAmount,
            remarks: this.state.remarks,
        }

        ClaimsService.submitClaim(claim, token)
            .then(res => {
                let claimId = res.data.claimId;
                console.log("Claim Id ---> ", claimId);
                this.props.navigate(`/bill-details/${claimId}`);
            })
            .catch(error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                this.setState({
                    message: resMessage
                });
            })
    }

    render() {
        return (
            <div>
                <div id="booking" className="section">
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
                                    <form onSubmit={this.submitClaimClicked}>
                                        {this.state.claimId && (
                                            <div className="form-group">
                                                <div className="alert alert-success" role="alert">
                                                    {this.state.claimId} <br />
                                                </div>
                                            </div>
                                        )}
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <span className="form-label" name="memberId">Member Id</span>
                                                    <input className="form-control" type="text" value={this.state.memberId}
                                                        name="memberId" onChange={this.handleChange} required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <span className="form-label" name="policyId">PolicyId</span>
                                                    <input className="form-control" type="text"
                                                        name="policyId" value={this.state.policyId}
                                                        onChange={this.handleChange} required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <span className="form-label" name="hospitalId">Hospitals</span>
                                                    <select className="form-control" name="hospitalId" value={this.state.hospitalId} onChange={this.handleChange}>
                                                        {this.state.hospitalsList.map(item => {
                                                            return (<option key={item.hospitalId} value={item.hospitalId}>{item.name}</option>);
                                                        })}
                                                    </select>
                                                    <span className="select-arrow" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <span className="form-label" name="benefitId">Benefits</span>
                                                    <select className="form-control" name="benefitId" value={this.state.benefitId} onChange={this.handleChange}>
                                                        {this.state.benefitsList.map(item => {
                                                            return (<option key={item.benefitId} value={item.benefitId}>{item.benefitName}</option>);
                                                        })}
                                                    </select>
                                                    <span className="select-arrow" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <span className="form-label" name="claimAmount">Claim Amount</span>
                                                    <input className="form-control" type="text" placeholder="Enter the amount to claim"
                                                        name="claimAmount" onChange={this.handleChange} required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <span className="form-label" name="remarks">Remarks</span>
                                                    <input className="form-control" type="text" placeholder="Any Remarks, please type here"
                                                        name="remarks"
                                                        onChange={this.handleChange} required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-btn">
                                                <button className="submit-btn">Submit Claim</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SubmitClaimFinalComponent;