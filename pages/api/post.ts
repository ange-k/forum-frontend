import type { NextApiRequest, NextApiResponse } from 'next'
import { PostQuery } from '../../components/post';
import { savePost } from '../../lib/gen/api/forum';

type Data = {
  code: number,
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.headers)

  if(req.method !== 'POST') {
    res.status(404);
    res.end();
  } else {
    const userAgent = req.headers['user-agent'] ? req.headers['user-agent'] : ''
    const body: PostQuery = {...req.body, userData: {
      ipAddr: '0.0.0.0', // x-forwarded-forからとるようにする
      userAgent: userAgent
    }};

    console.log(body);
    savePost(body).then((response) => {
      console.log(response);
      res.status(200)
    }).catch((e) => {
      res.status(500);
      console.error(e);
    }).finally(() => {
      res.end()
    })
  }
}
