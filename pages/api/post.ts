import type { NextApiRequest, NextApiResponse } from 'next'
import { PostQuery } from '../../components/post';
import { savePost } from '../../lib/gen/api/forum';

type Data = {
  code: number,
  message: string
}

const validate = ((body: PostQuery) => {
  if(!body.gameId) {
    return false;
  }

  if(!body.playerName) {
    return false;
  }

  if(!body.purpose) {
    return false;
  }

  if(!body.vcUse) {
    return false;
  }

  if(!body.title || body.title.length > 30) {
    return false;
  }

  if(!body.playerName || body.playerName.length > 15) {
    return false;
  }

  if(!body.device || body.device.length > 15) {
    return false
  }

  if(!body.comment || body.comment.length > 600) {
    return false;
  }

  if(body.server && body.server.length > 15) {
    return false;
  }
  if(body.tags && body.tags.length > 5) {
    return false;
  }
  if(body.selfTags && body.selfTags.length > 5) {
    return false;
  }

  if(body.imageData && body.imageData.length > 150000) {
    console.error("ファイルサイズ過大");
    return false;
  }
  return true;
});

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

    if(!validate(body)) {
      console.log('サーバサイドValidation違反');
      res.status(400);
      return;
    }

    savePost(body).then((response) => {
      if(response.code !== "OK") {
        console.log(response.message);
        res.status(500);
      }
      else {
        res.status(200)
      }
    }).catch((e) => {
      res.status(500);
      console.error(e);
    }).finally(() => {
      res.end()
    })
  }
}
