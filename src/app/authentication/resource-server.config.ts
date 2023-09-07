export const resourceServerConfig: ResourceServerConfig = {
  urls: ['http://localhost:8081']
};

export declare abstract class ResourceServerConfig {
    urls?: Array<string>;
}