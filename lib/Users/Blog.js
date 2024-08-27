import { Octicons } from '@expo/vector-icons';
import {createClient} from '@sanity/client';
import { Text, View } from 'react-native';

export const client = createClient({
    projectId: 'cw03q0cz',
    dataset: 'production',
    useCdn: true, 
    apiVersion: '2022-03-07', 
  })

const fetchBlogs = async () => {
  try{
  const query = `*[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      "name": author->name,
      "authorImage": author->image.asset->url,
      "mainImage": mainImage.asset->url,
    }`;
  const data = await client.fetch(query);
  return data;
  }catch(error){
      console.error(error);
      throw error;
  }
}
const fetchSingleBlog = async (id) => {
  try{
  const query = `*[_type == "blogPost" && _id == $id]{
      title,
      slug,
      publishedAt,
      excerpt,
      "name": author->name,
      "authorImage": author->image.asset->url,
      "mainImage": mainImage.asset->url,
      body
    }`;
  const data = await client.fetch(query, {id});
  return data;
  }catch(error){
      console.error(error);
      throw error;
  }
}


export {fetchBlogs, fetchSingleBlog};

