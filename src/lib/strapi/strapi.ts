import qs from 'qs';
import type { GlobalData, HomeData, Service } from './types';

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL ?? import.meta.env.STRAPI_URL ?? 'http://localhost:1337';
const STRAPI_TOKEN = import.meta.env.STRAPI_TOKEN;

const authHeaders: HeadersInit = STRAPI_TOKEN
  ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
  : {};

const QUERY_HOME_PAGE ={
  populate: {
    hero: {
      populate: '*',
    },
    seo: {
      populate: '*',
    },
    triad: {
      populate: '*',
    }
  },
}

export const QUERY_SERVICES = {
  populate: {
    heroImage: {
      populate: "*",
    },
    body: {
      on: {
        "sections.rich-text": {
          populate: "*",
        },
        "sections.image": {
          populate: {
            image: {
              populate: "*",
            },
          },
        },
        "sections.gallery": {
          populate: {
            images: {
              populate: "*",
            },
          },
        },
      },
    },
  },
};

export async function getStrapiData<T>(url: string): Promise<T> {
  try{
    const response = await fetch(`${STRAPI_URL}${url}`, { headers: authHeaders });
    if(!response.ok){
      throw new Error(`Failed to fetch data from Strapi: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data as T;
  }catch(error){
    console.error("Error fetching data from Strapi: ", error);
    throw `Error fetching data from Strapi: ${STRAPI_URL}${url}`;
  }
}


export async function getGlobal(): Promise<GlobalData> {
  return getStrapiData<GlobalData>('/api/global');
}


export async function getHome(): Promise<HomeData> {
  const query = qs.stringify(QUERY_HOME_PAGE);
  const response = await getStrapiData<HomeData>(`/api/home?${query}`);

  return response;
}

export async function getServices(): Promise<Service[]> {
  const query = qs.stringify(QUERY_SERVICES);
  const res = await fetch(`${STRAPI_URL}/api/services?${query}`, { headers: authHeaders });
  const { data } = await res.json();
  return (data ?? []).map((item: any) => ({ ...item }));
}

export async function getServiceBySlug(slug: string): Promise<Service> {
  const query = qs.stringify({
    ...QUERY_SERVICES,
    filters: { slug: { $eq: slug } },
  });
  const res = await fetch(`${STRAPI_URL}/api/services?${query}`, { headers: authHeaders });
  const { data } = await res.json();
  return { ...data[0] };
}