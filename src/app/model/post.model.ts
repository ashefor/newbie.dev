export interface posts {
    _id?: number;
    title: string;
    content: string;
    author?: string;
    date?: Date;
    comments?: IComments[];
    media?:any;
    meta: {
        likes?: number;
        tags: any;
        mediaIds: any;
    }

}
export interface IComments {
    id?: number,
    content: string;
    date?: Date;
    replies?: IReplies[];
    likes?: Number;
}
export interface IReplies {
    content: string,
    date?: Date
}
export interface IMedia {

}
