export type Collections = {
    id: string;
    title: string;
    coverPhoto: string,
};

export type Photo = {
    id: string;
    alt: string,
    photo: string,
};

export type PhotoReply = {
    id: string;
    alt_description: string,
    urls: {
        thumb: string,
    },
};

export type OrderBy
    = 'popular'
    | 'latest'
    ;
