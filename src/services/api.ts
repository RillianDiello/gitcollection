import axios from 'axios'
export const baseURL = 'https://api.github.com';
export const api = axios.create({
    baseURL: baseURL,
})