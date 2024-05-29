import { Component } from 'react';

import ViewBillsService from '../../../../../api/services/ViewBillsService';

class BillDetailsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            memberId: this.props.params.memberId,
            date: '',
            policyId: '',
            dueAmount: '',
            dueDate: '',
            lateCharge: '',
            totalAmount: '',
            bill: null,

            message: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() 
    {

        let token = JSON.parse(window.sessionStorage.getItem('authenticatedUser')).jwtAuthToken;
        let bill = this.state.bill;
        let { policyId, dueAmount, dueDate, lateCharge, totalAmount } = this.state
        ViewBillsService.getBillInfo(this.state.memberId, token)
            .then(res => {
                bill = res.data
                dueAmount = res.data.dueAmount
                policyId = res.data.policyId
                dueDate = res.data.dueDate
                // lateCharge = res.data.lateCharge
                // totalAmount = dueAmount + lateCharge
                totalAmount = dueAmount
                this.setState({ policyId, dueAmount, dueDate, lateCharge, totalAmount });
                console.log("bill data", bill);
            })
            .catch(error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                this.setState({
                    message: "An unexpected " + resMessage + ", has occured, please try after some time."
                });
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
        const { memberId, policyId, dueAmount, dueDate, lateCharge, totalAmount } = this.state;

        return (
            <div className="container">
                <div>
                    {/* Masthead*/}
                    <header className="masthead" id="billpage-header">
                        <div className="container">
                            <div className="masthead-subheading">Please find your bills below</div>
                        </div>
                    </header>
                </div>

                {this.state.message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {this.state.message} <br/>
                            <i>If you still need any assistance please contact our support team at <br/> <a>pod3@support.com</a></i>
                        </div>
                    </div>
                )}

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
                                                        {memberId}<br />
                                                        ----------
                                                    </address>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                                                <div className="invoice-details">
                                                    <div className="invoice-num">
                                                        <div>Invoice</div>
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
                                                                    policyId
                                                                </td>
                                                                <td colSpan={2}>{policyId}</td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={2}>
                                                                    Due Amount
                                                                </td>
                                                                <td colSpan={2}> {dueAmount} </td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={2}>
                                                                    Due Date
                                                                </td>
                                                                <td colSpan={2}> {dueDate} </td>
                                                            </tr>
                                                            <tr>
                                                                <td>&nbsp;</td>
                                                                <td colSpan={2}>
                                                                    <p>
                                                                        Subtotal<br />
                                                                        {/* Late Fee<br /> */}
                                                                    </p>
                                                                    <h5 className="text-success"><strong>Grand Total</strong></h5>
                                                                </td>
                                                                <td>
                                                                    <p>
                                                                        {dueAmount} <br />
                                                                        {/* {lateCharge} */}
                                                                    </p>
                                                                    <h5 className="text-success"><strong>{totalAmount}</strong></h5>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Row end */}
                                    </div>
                                    <div className="invoice-footer">
                                        Thank you for visting us.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    empty <br />
                    empty
                </div>
            </div>
        );
    }
}

export default BillDetailsComponent;