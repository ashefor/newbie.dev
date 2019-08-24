export interface posts {
    _id: number;
    title: string;
    body: string;
    author: string;
    date: Date;
    comments: IComments[]
    meta: {
        likes: number;
        tags: any
    }

}
export interface IComments {
    id?: number,
    body: string;
    date?: Date;
    replies?: IReplies[];
    likes?: Number;
}
export interface IReplies {
    text: string,
    date: Date
}
