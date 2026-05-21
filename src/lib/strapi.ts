import qs from 'qs';

const STRAPI_URL = import.meta.env.STRAPI_URL ?? 'http://localhost:1337';
const STRAPI_TOKEN = import.meta.env.STRAPI_TOKEN;


export interface SeoData {
  metaTitle: string;
  metaDescription: string;
  shareImage?: { data: { attributes: { url: string } } };
}

export interface HeroData {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  image: {
    url: string;
    alternativeText?: string;
  };
}

export interface TriadData{
  slogan: string;
  triad1: string;
  triad2: string;
  triad3: string;
}

export interface HomeData {
  hero: HeroData;
  seo: SeoData;
  triad: TriadData;
}


export interface GlobalData {
  seo: SeoData;
}

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

export async function getStrapiData<T>(url: string): Promise<T> {
  try{
    const response = await fetch(`${STRAPI_URL}${url}`);
    if(!response.ok){
      throw new Error(`Failed to fetch data from Strapi: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data as T;
  }catch(error){
    console.error("Error fetching data from Strapi: ", error);
    throw `Error fetching data from Strapi: ${STRAPI_URL}/api${url}`;
  }
}

// export async function fetchStrapi<T>(
//   path: string
// ): Promise<T> {

//   const url = new URL(`/api${path}`, STRAPI_URL);

//   if (populate) url.searchParams.set('populate', populate);

//   const headers: Record<string, string> = {
//     'Content-Type': 'application/json',
//   };
//   if (STRAPI_TOKEN) headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;

//   const res = await fetch(url.toString(), { headers });
//   if (!res.ok) throw new Error(`Strapi fetch failed: ${res.status} ${url}`);

//   const json = await res.json();
//   return json.data as T;
// }

export async function getGlobal(): Promise<GlobalData> {
  return getStrapiData<GlobalData>('/api/global');
}

export async function getHome(): Promise<HomeData> {
  const query = qs.stringify(QUERY_HOME_PAGE);
  const response = await getStrapiData<HomeData>(`/api/home?${query}`);

  return response;
}
