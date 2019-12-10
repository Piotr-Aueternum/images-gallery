export type Collections = {
  id: string;
  title: string;
  coverPhoto: string,
};

export type CollectionsReply = {
  id: string;
  title: string;
  cover_photo: {
    urls: {
      thumb: string,
    },
  };
};
