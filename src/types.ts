export type GetResponse = {
    data: unknown;
};

export type PutResponse = {
    created: boolean;
};

export type InvalidRequestError = {
    error: string;
    message: string;
};

export type Stats = {
    defaultTTL: number;
    maxStorageSize: number;
    storageUsed: number;
};
