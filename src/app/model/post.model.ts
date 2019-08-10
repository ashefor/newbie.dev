export class posts {
    _id: number;
    title: string;
    body: string;
    author: string;
    date: Date;
    comments: [{
        body: string;
        date: Date;
    }];
    meta: {
        likes: number;
        tags: Array<any>
      }
}