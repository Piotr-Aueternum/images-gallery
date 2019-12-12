export type Photo = {
    color: string;
    description: string;
    alt: string,
    photo: string,
};

export type PhotoReply = {
    id: string;
    color: string;
    description: string,
    alt_description: string,
    urls: {
        thumb: string,
    },
};
