import type { NextApiRequest, NextApiResponse } from 'next'
import { postDelete, PostDeleteRequest, ResponseData } from '../../../lib/gen/api/forum';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
  ) {
    console.log(req.headers)
  
    if(req.method !== 'POST') {
      res.status(404);
      res.end();
    } else {
  
      const {
        query: {uuid}
      } = req

      console.log("delete:" )
      console.log(req.body);
      postDelete(req.body, uuid as string).then((response) => {
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