import { SSTConfig } from 'sst';
import { NextjsSite } from 'sst/constructs';

export default {
  config(_input) {
    return {
      name: 'cuculus',
      region: 'ap-northeast-1',
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      let domain = 'cuculus.jp';
      // 検証環境向けだった場合
      if (stack.stage !== 'production') {
        domain = `${stack.stage}.${domain}`;
      }
      const site = new NextjsSite(stack, 'site', {
        customDomain: {
          domainName: domain,
          hostedZone: domain,
        },
        environment: {
          NEXT_PUBLIC_CUCULUS_API_URL: `https://api.${domain}`,
          SITE_URL: `https://${domain}`,
          NODE_ENV: stack.stage,
          STAGE: stack.stage,
        },
        warm: 100,
        logging: 'combined',
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
