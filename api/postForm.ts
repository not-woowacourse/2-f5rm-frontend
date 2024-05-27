import axios from 'axios';

import { type RegisterSchemaType } from '@/lib/registerSchema';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const CLIENT_NAME = process.env.NEXT_PUBLIC_CLIENT_NAME;
const SLUG = process.env.NEXT_PUBLIC_SLUG;

const instance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Client-Name': CLIENT_NAME,
    'Content-Type': 'application/json',
  },
});

export const postForm = async (formData: RegisterSchemaType) => {
  try {
    const { data } = await instance.post(`/forms/${SLUG}`, { data: formData });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
