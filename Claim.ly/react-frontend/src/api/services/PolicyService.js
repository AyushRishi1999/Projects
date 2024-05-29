import axios from 'axios';
const USER_API_BASE_URL = "http://localhost:8004/policy"

class PolicyService
{
    getHospitalsInfo(policyId, token)
    {
        return axios.get(USER_API_BASE_URL + "/getChainOfProviders" + `/${policyId}`, { headers: {"Authorization" : `Bearer ${token}`} });
    }

    getBenefitsInfo(policyId, memberId, token)
    {
        return axios.get(USER_API_BASE_URL + "/getEligibleBenefits" + `/${policyId}` + `/${memberId}`, { headers: {"Authorization" : `Bearer ${token}`} });
    }
}

export default new PolicyService();