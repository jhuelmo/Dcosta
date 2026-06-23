import qs from 'qs';
import type { GlobalData, HomeData, Service, Work, DocPageData, Post } from './types';

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
    },
    works: {
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

export const QUERY_WORKS = {
  populate: {
    heroImage: {
      populate: "*",
    },
    gallery: {
      populate: "*",
    },
  },
};

export const QUERY_DOC_PAGE = {
  populate: {
    sections: {
      populate: "*",
    },
  },
};

export const QUERY_POSTS = {
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
  sort: ["publishedAt:desc"],
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

export async function getWorks(): Promise<Work[]> {
  const query = qs.stringify(QUERY_WORKS);
  const res = await fetch(`${STRAPI_URL}/api/works?${query}`, { headers: authHeaders });
  const { data } = await res.json();
  return (data ?? []).map((item: any) => ({ ...item }));
}

export async function getWorkBySlug(slug: string): Promise<Work> {
  const query = qs.stringify({
    ...QUERY_WORKS,
    filters: { slug: { $eq: slug } },
  });
  const res = await fetch(`${STRAPI_URL}/api/works?${query}`, { headers: authHeaders });
  const { data } = await res.json();
  return { ...data[0] };
}

export async function getLegal(): Promise<DocPageData> {
  const query = qs.stringify(QUERY_DOC_PAGE);
  return getStrapiData<DocPageData>(`/api/legal?${query}`);
}

export async function getFaq(): Promise<DocPageData> {
  const query = qs.stringify(QUERY_DOC_PAGE);
  return getStrapiData<DocPageData>(`/api/faq?${query}`);
}

export async function getCookie(): Promise<DocPageData> {
  const query = qs.stringify(QUERY_DOC_PAGE);
  return getStrapiData<DocPageData>(`/api/cookie?${query}`);
}

export async function getPosts(): Promise<Post[]> {
  const query = qs.stringify(QUERY_POSTS);
  const res = await fetch(`${STRAPI_URL}/api/posts?${query}`, { headers: authHeaders });
  const { data } = await res.json();
  return (data ?? []).map((item: any) => ({ ...item }));
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const query = qs.stringify({
    ...QUERY_POSTS,
    filters: { slug: { $eq: slug } },
  });
  const res = await fetch(`${STRAPI_URL}/api/posts?${query}`, { headers: authHeaders });
  const { data } = await res.json();
  return { ...data[0] };
}