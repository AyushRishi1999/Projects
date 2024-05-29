import axios from 'axios';
const USER_API_BASE_URL = "http://localhost:8002/claimModule/getClaimStatus"

class ViewClaimsService
{
    getClaimInfo(claimId, token)
    {
        return axios.get(USER_API_BASE_URL + `/${claimId}`, { headers: {"Authorization" : `Bearer ${token}`} });
    }
}

export default new ViewClaimsService();