// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@sanity/client';

const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn: process.env.NODE_ENV === "production",
    token: process.env.SANITY_API_TOKEN,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-06-14",
};

export const client = createClient(config);

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const {_id, name, email, comment} = JSON.parse(req.body);

    try{
        await client.create({
            _type: 'comment',
            post: {
                _type: 'reference',
                _ref: _id
            },
            name,
            email,
            comment
        });
    }catch (err) {
         return res.status(500).json({ message: 'Couldn not submit comment', err });

    }

  return res.status(200).json({ message: 'comment submitted' });
}
