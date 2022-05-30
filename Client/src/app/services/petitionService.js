import httpService from "./httpService";
const petitionEndPoint = "petitions";

const petitionService = {
    fetchAll: async (jwtToken) => {
        const { data } = await httpService.get(petitionEndPoint, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
        // console.log(data);
        return data;
    },
    getById: async (petitionId, jwtToken) => {
        const { data } = await httpService.get(
            petitionEndPoint + `/${petitionId}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
        );
        return data;
    },
    create: async (payload, jwtToken) => {
        const { data } = await httpService.post(petitionEndPoint, payload, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
        return data;
    },
    update: async (payload, jwtToken) => {
        const { data } = await httpService.put(petitionEndPoint, payload, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
        return data;
    },
    delete: async (petitionId, jwtToken) => {
        const { data } = await httpService.delete(
            petitionEndPoint + `/${petitionId}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
        );
        return data;
    }
};

export default petitionService;
