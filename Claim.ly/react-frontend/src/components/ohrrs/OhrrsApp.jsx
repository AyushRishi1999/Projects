import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import LoginComponent from './User/Authentication/LoginComponent';
import UserRegistrationComponent from './User/UserRegistrationComponent';
import UserHomePageComponent from './User/UserHomePage/UserHomePageComponent';

import AuthenticatedRoute from './User/Authentication/AuthenticatedRoute';

import HeaderComponent from './HeaderFooterComponents/HeaderComponent';
import FooterComponent from './HeaderFooterComponents/FooterComponent';

import LogoutComponent from './User/Authentication/LogoutComponent';

import withNavigation from './Routing/withNavigation';
import withParams from './Routing/withParams';

import ViewBillsComponent from './User/UserHomePage/Bills/ViewBillsComponent';
import ViewClaimsComponent from './User/UserHomePage/Claims/ViewClaimsComponent';

import SubmitClaimInitialComponent from './User/UserHomePage/Claims/SubmitClaimInitialComponent';
import SubmitClaimFinalComponent from './User/UserHomePage/Claims/SubmitClaimFinalComponent';

import BillDetailsComponent from './User/UserHomePage/Bills/BillDetailsComponent';
import ClaimDetailsComponent from './User/UserHomePage/Claims/ClaimDetailsComponent';

class OhrrsApp extends Component {
    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        //const AdminLoginComponentWithNavigation = withNavigation(AdminLoginComponent);

        const UserHomePageComponentwithParams = withParams(UserHomePageComponent);
        //const AdminHomePageComponentWithParams = withParams(AdminHomePageComponent);

        const ViewBillsComponentWithParamsWithNavigation = withParams(withNavigation(ViewBillsComponent));
        const ViewClaimsComponentWithParamsWithNavigation = withParams(withNavigation(ViewClaimsComponent));

        const UserRegistrationComponentWithNavigation = withNavigation(UserRegistrationComponent);

        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);

        const BillDetailsComponentWithParamsWithNavigation = withParams(withNavigation(BillDetailsComponent));
        const ClaimDetailsComponentWithParamsWithNavigation = withParams(withNavigation(ClaimDetailsComponent));

        const SubmitClaimInitialComponentWithParamsWithNavigation = withParams(withNavigation(SubmitClaimInitialComponent));
        const SubmitClaimFinalComponentWithParamsWithNavigation = withParams(withNavigation(SubmitClaimFinalComponent));


        return (
            <div className="OhrrsApp">
                <Router>
                    <HeaderComponentWithNavigation />
                    <Routes>
                        <Route path="/" element={<UserHomePageComponent />} />
                        <Route path="/login" element={<LoginComponentWithNavigation />} />
                        <Route path="/registration" element={<UserRegistrationComponentWithNavigation />} />
                        <Route path="/home/:name" element={<AuthenticatedRoute><UserHomePageComponentwithParams /></AuthenticatedRoute>} />
                        <Route path="/view-bills" element={<AuthenticatedRoute><ViewBillsComponentWithParamsWithNavigation /></AuthenticatedRoute>} />
                        <Route path="/view-claims" element={<AuthenticatedRoute><ViewClaimsComponentWithParamsWithNavigation /></AuthenticatedRoute>} />
                        <Route path="/bill-details/:memberId" element={<AuthenticatedRoute><BillDetailsComponentWithParamsWithNavigation /></AuthenticatedRoute>} />
                        <Route path="/claim-details/:claimId" element={<AuthenticatedRoute><ClaimDetailsComponentWithParamsWithNavigation /></AuthenticatedRoute>} />
                        <Route path="/submit-claim" element={<AuthenticatedRoute><SubmitClaimInitialComponentWithParamsWithNavigation /></AuthenticatedRoute>} />
                        <Route path="/submit-claim-final/:memberId" element={<AuthenticatedRoute><SubmitClaimFinalComponentWithParamsWithNavigation /></AuthenticatedRoute>} />
                        <Route path="/logout" element={<AuthenticatedRoute><LogoutComponent /></AuthenticatedRoute>} />

                        {/* <Route path="/admin-Login" element={<AdminLoginComponentWithNavigation />} />
                        <Route path="/admin-ListRooms/:id" element={<AdminAuthenticatedRoute><UpdateRoomInformationComponentWithParamsAndNavigation /></AdminAuthenticatedRoute>} />
                        <Route path="/admin-ListUsers/:id" element={<AdminAuthenticatedRoute><UpdateUserInformationComponentWithParamsAndNavigation /></AdminAuthenticatedRoute>} />
                        <Route path="/admin-ListRooms" element={<AdminAuthenticatedRoute><ListAllRoomsComponentWithNavigation /></AdminAuthenticatedRoute>} />
                        <Route path="/admin-ListUsers" element={<AdminAuthenticatedRoute><ListUserComponentWithNavigation /></AdminAuthenticatedRoute>} />
                        <Route path="/admin-ListBookings" element={<AdminAuthenticatedRoute><ListAllBookingsComponent /></AdminAuthenticatedRoute>} />
                        <Route path="/admin-Home/:username" element={<AdminAuthenticatedRoute><AdminHomePageComponentWithParams /></AdminAuthenticatedRoute>} /> */}
                        {/* <Route path="/admin-Logout" element={<AdminAuthenticatedRoute><AdminLogoutComponent /></AdminAuthenticatedRoute>} /> */}

                        <Route path="*" element={<ErrorComponent />} />
                    </Routes>
                    <FooterComponent />
                </Router>
            </div>
        );
    }
}

function ErrorComponent() 
{
    return (<div>
            <br />
            <h3>An unexpected error has occured, please contact support at <Link>pod3@support.com</Link></h3>
        </div>);
}

export default OhrrsApp;