import axios from 'axios';
const USER_API_BASE_URL = "http://localhost:8003/memberModule/viewBills"

class ViewBillsService
{
    getBillInfo(memberId, token)
    {
        return axios.get(USER_API_BASE_URL + `/${memberId}`, { headers: {"Authorization" : `Bearer ${token}`} });
    }
}

export default new ViewBillsService();