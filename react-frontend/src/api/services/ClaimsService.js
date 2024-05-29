import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8002/claimModule"

class ClaimsService
{
    submitClaim(claim, token)
    {
        return axios.post(USER_API_BASE_URL + "/submitClaim", claim, { headers: {"Authorization" : `Bearer ${token}`} });
    }
}

export default new ClaimsService();