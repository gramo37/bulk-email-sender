"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/axios/axiosInstance.ts
const axios_1 = __importDefault(require("axios"));
const baseURL = 'http://localhost:8000';
const axiosInstance = axios_1.default.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});
axiosInstance.interceptors.request.use((config) => {
    // Add any custom headers or logging here
    return config;
}, (error) => {
    return Promise.reject(error);
});
axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // Handle response errors here
    return Promise.reject(error);
});
exports.default = axiosInstance;
