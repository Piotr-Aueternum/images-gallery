export type Collections = {
  id: string;
  title: string;
  coverPhoto: string,
};

export enum FetchStatus {
    Initial,
    Fetching,
    Fetched,
}
