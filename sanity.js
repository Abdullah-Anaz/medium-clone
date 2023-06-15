import{
    createCurrentUserHook,
    createClient
} from "next-sanity";

import createImageUrlBuilder from '@sanity/image-url';

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-06-14",
  useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient(config);
export const urlfor = (source) => createImageUrlBuilder(config).image(source);
//export const useCurrentUser = createCurrentUserHook(config);