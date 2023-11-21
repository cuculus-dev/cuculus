import { SSTConfig } from 'sst';
import { NextjsSite } from 'sst/constructs';
import { CachePolicy } from 'aws-cdk-lib/aws-cloudfront';
import { Duration } from 'aws-cdk-lib';

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
      const serverCachePolicy = new CachePolicy(stack, 'ServerCache', {
        minTtl: Duration.seconds(1),
        defaultTtl: Duration.seconds(86400),
      });
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
        cdk: {
          serverCachePolicy,
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
