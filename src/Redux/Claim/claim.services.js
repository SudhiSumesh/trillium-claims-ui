import axios from "axios";
import { Apis } from "../APIs";
import httpCommon from "../http/http.common";
class ClaimServices {
  getClaimsData(data) {
    return axios.get(
      // `${Apis.getClaimsDataApi}?clinicId=${data.clinicId}&start=${data.start}&limit=${data.limit}&providerIds=${data.providerIds}&serviceIds=${data.serviceIds}&status=${data.status}&startDate=${data.startDate}&endDate=${data.endDate}&facilityIds=${data.facilityIds}`
      `  ${Apis.getClaimsDataApi}?start=${data.start}&limit=${
        data.limit
      }&clinicId=${data.clinicId}&providerIds=${
        data.providerIds ? data.providerIds : ""
      }&serviceIds=${data.serviceIds ?? null}&facilityIds=${data.facilityIds ?? null}&status=${
        data.status ?? null
      }&startDate=${data.startDate}&endDate=${data.endDate}&patientName=${
        data.patientName??""
      }`
    );
  }
  deleteClaimApi(claimId) {
    return axios.delete(`${Apis.claimDeleteApi}/${claimId}`);
  }
}

export default new ClaimServices();
