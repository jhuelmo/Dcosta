import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  upload: {
    config: {
      security: {
        strictSsrf: false,
      },
      sizeLimit: 250 * 1024 * 1024,
    },
  },
});

export default config;