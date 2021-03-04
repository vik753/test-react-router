/*
"userId": 2,
  "id": 11,
  "title": "et ea vero quia laudantium autem",
  "body": "i incidunt\nut animi commodi"
*/

export class Post {
  constructor({userId = null, id = null, title = null, body = null}) {
    if (!userId || !id) return null;
    this.userId = userId;
    this.id = id;
    this.title = title;
    this.body = body;
  }
}
