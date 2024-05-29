import { Component } from 'react';

class ViewClaimsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ClaimId: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.viewClaimClicked = this.viewClaimClicked.bind(this);
    }

    handleChange(event) {
        console.log(event.target.name)
        this.setState({ [event.target.name]: event.target.value })
    }

    viewClaimClicked() {
        let ClaimId = this.state.ClaimId;
        this.props.navigate(`/claim-details/${ClaimId}`);
    }

    render() {
        return (
            <div className="listRoomsComponent">
                <div>
                    {/* Masthead*/}
                    <header className="masthead" id="our-rooms-header">
                        <div className="container">
                            <div className="masthead-subheading">Please find your Claim Status below</div>
                        </div>
                    </header>
                </div>

                <section className="rooms">
                    <div id="box">
                        <div className="row-room">
                            <div className="column-room">
                                <div className="card-room">
                                    <img src="./img/our rooms/general-room.jpg" alt="Jane" style={{ width: '100%' }} />
                                    <div className="container-room">
                                        <h2>G class</h2>
                                        {/* <p className="title">CEO &amp; Founder</p> */}
                                        <p className="title"></p>
                                        <p></p>
                                        <br />
                                    </div>
                                </div>
                            </div>
                            <div id="view_bill_id" className="section">
                                <div className="section-center">
                                    <div className="container">
                                        <div className="row">
                                            <div className="view-bills-form">
                                                <form>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <span className="form-label" name="view_bill_id">Claim ID</span>
                                                                <input className="form-control" type="text"
                                                                    name="ClaimId" placeholder="Enter Claim id here" onChange={this.handleChange} required />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="form-btn">
                                                                <button type="button" className="submit-btn" onClick={this.viewClaimClicked}>View Status</button>
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
                </section>
                
            </div>
        );
    }
}

export default ViewClaimsComponent;