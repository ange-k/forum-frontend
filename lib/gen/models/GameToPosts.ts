import { Post } from "./Post";

export default interface GameToPosts {
    key: string,
    name: string,
    posts: Post[]
}