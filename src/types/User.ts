export type TUser = {
  name: string;
  username: string;
  password: string;
} & {
  _id?: string;
};
