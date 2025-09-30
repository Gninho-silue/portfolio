import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Client Sanity SANS token (sécurisé)
export const client = createClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2025-02-19',
    useCdn: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);