export interface ActivityMap {
  [userId: number]: {
    posts: number
    done: number
    pending: number
  }
}
