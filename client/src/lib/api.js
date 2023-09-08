const apiUrl = "http://localhost:3000";
import axios from "axios";

const ApiInstance = axios.create({
    baseURL: "http://localhost:3000",
});

ApiInstance.interceptors.response.use(
    (res) => {
        return {
            status: res.status === 200 ? true : false,
            data: res.data,
        };
    },
    (error) => {
        return {
            status: false,
            message: error?.response?.data?.message,
        };
    }
);
ApiInstance.interceptors.request.use(function (config) {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.token) {
        config.headers.Authorization = userInfo.token;
    }
    return config;
});

export const adminLogin = async (data) => {
    return ApiInstance.post(`/auth/admin/login`, data);
};

export const userLogin = async (data) => {
    return ApiInstance.post("/auth/user/login", data);
};

export const getItemList = async () => {
    return ApiInstance.get("/auctionitem");
};

export const getItemDetails = async (auctionId) => {
    return ApiInstance.get(`/auctionitem/${auctionId}`);
};

export const submitBid = async (params) => {
    return ApiInstance.post("/auctionbid", params);
};

export const searchItem = async (name) => {
    return ApiInstance.get(`/auctionitem/search/item?name=${name}`);
};

export const getUserBids = async (params) => {
    return ApiInstance.post("/auctionbid/user/bid", params);
};

export const getItemBids = async (itemId) => {
    return ApiInstance.get(`/auctionbid/item/${itemId}`);
};

export const getUserInfoFromLocal = () => {
    return JSON.parse(localStorage.getItem("userInfo") ?? null);
};

export const addItem = async (params) => {
    return ApiInstance.post("/auctionItem", params);
};

export const deleteItem = async (itemId) => {
    return ApiInstance.delete(`/auctionitem/${itemId}`);
};

export const deleteBid = async (bidId) => {
    return ApiInstance.delete(`/auctionbid/${bidId}`);
};

export const createUser = async (params) => {
    return ApiInstance.post(`/auth/create/user`, params);
};