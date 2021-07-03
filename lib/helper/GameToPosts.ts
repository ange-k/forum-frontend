import { Post } from "../gen/models/Post";

export default interface GameToPosts {
    key: string,
    name: string,
    posts: Post[]
}