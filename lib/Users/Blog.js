import {createClient} from '@sanity/client';

export const client = createClient({
    projectId: 'cw03q0cz',
    dataset: 'production',
    useCdn: true, 
    apiVersion: '2022-03-07', 
  })

  const sampleInstance=  {
    "_rev": "wTrjYp0asoDyZ7MiFUyGwX",
    "body": [
      {
        "children": [
          {
            "marks": [],
            "text": "Introduction",
            "_key": "f97b69c10032",
            "_type": "span"
          }
        ],
        "_type": "block",
        "style": "h1",
        "_key": "72b234323b70",
        "markDefs": []
      },
    ],
    "title": "My blog",
    "excerpt": "This is the summary of blog",
    "slug": {
      "current": "my-blog",
      "_type": "slug"
    },
    "publishedAt": "2024-07-20T08:51:13.212Z",
    "mainImage": {
      "_type": "image",
      "asset": {
        "_type": "reference",
        "_ref": "image-c11e395db671d8d613898cefbabac536c453ec0a-1600x741-png"
      }
    },
    "_createdAt": "2024-07-20T08:51:20Z",
    "seo": {
      "metaTitle": "Blog 2",
      "metaDescription": "Meta description of blog 2"
    },
    "_type": "blogPost",
    "_id": "04256ca7-b80b-4df3-885d-f89ceafacda2",
    "categories": [
      {
        "_ref": "5f539cef-eb6a-4c8b-8c0a-8120a0670e35",
        "_type": "reference",
        "_key": "ced9fb394a9f"
      },
      {
        "_ref": "bd4a4879-7a64-4d4c-913c-9f80c4d75617",
        "_type": "reference",
        "_key": "57062d2db901"
      }
    ],
    "author": {
      "_ref": "507cb9f5-9cda-4a86-a060-729f986eb0eb",
      "_type": "reference"
    },
    "_updatedAt": "2024-08-08T06:12:46Z"
  }
  const fetchBlogs = async () => {
    try{
    const query = `*[_type == "blogPost"] | order(publishedAt desc) {
        title,
        slug,
        publishedAt,
        excerpt,
        "name": author->name,
        "categories": categories[]->title,
        "authorImage": author->image.asset->url,
        "mainImage": mainImage.asset->url,
        body
      }`;
    const data = await client.fetch(query);
    return data;
    }catch(error){
        console.error(error);
        throw error;
    }
  }


