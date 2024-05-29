import { Component } from 'react';
import moment from 'moment';
import ViewClaimsService from '../../../../../api/services/ViewClaimsService';

class ClaimDetailsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            claimId: this.props.params.claimId,
            claim : null,
            claimStatus: '',
            claimDescription: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() 
    {
        let token = JSON.parse(window.sessionStorage.getItem('authenticatedUser')).jwtAuthToken;

        let claim = this.state.claim;

        let {claimId, claimStatus, claimDescription} = this.state
        console.log("......Inside Component Did Mount......");
        ViewClaimsService.getClaimInfo(this.state.claimId, token)
            .then(res => {
                claim = res.data
                console.log("......Success, Inside get claim data......");
                claimStatus = res.data.claimStatus
                claimDescription = res.data.claimDescription

                this.setState({claimId, claimStatus, claimDescription});
                console.log("claim data", claim);
            })
        this.getDate();
    }

    getDate = () => {
        var date = new Date().toDateString();
        this.setState({ date });
      };

    handleChange(event) {
        console.log(event.target.name)
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        const { date } = this.state;
        const { claimId, claimStatus, claimDescription } = this.state;

        return (
            <div className="container">
                <div>
                    {/* Masthead*/}
                    <header className="masthead" id="billpage-header">
                        <div className="container">
                            <div className="masthead-subheading">Please find your claim status below</div>
                        </div>
                    </header>
                </div>

                <div className="row gutters" id="billpage">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-body p-0">
                                <div className="invoice-container">
                                    <div className="invoice-header">
                                        <div className="row gutters">
                                            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                                                <div className="invoice-details">
                                                    <address>
                                                        {claimId}<br />
                                                        
                                                    </address>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                                                <div className="invoice-details">
                                                    <div className="invoice-num">
                                                        <div>Claim Status</div>
                                                        <div>{date}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Row end */}
                                    </div>
                                    <div className="invoice-body">
                                        {/* Row start */}
                                        <div className="row gutters">
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <div className="table-responsive">
                                                    <table className="table custom-table m-0">
                                                        <thead>
                                                            <tr>
                                                                <th colSpan={2}>Detail</th>
                                                                <th colSpan={2}>Value</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td colSpan={2}>
                                                                    claimId
                                                                </td>
                                                                <td colSpan={2}>{claimId}</td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={2}>
                                                                    Claim Description
                                                                </td>
                                                                <td colSpan={2}> {claimDescription} </td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={2}>
                                                                    Claim Status
                                                                </td>
                                                                <td colSpan={2}> {claimStatus} </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Row end */}
                                    </div>
                                    <div className="invoice-footer">
                                        Thank you for visiting us.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    empty <br/>
                    empty
                </div> 
            </div>
        );
    }
}

export default ClaimDetailsComponent;