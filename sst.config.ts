import { SSTConfig } from 'sst';
import { NextjsSite } from 'sst/constructs';
import { CacheHeaderBehavior, CachePolicy } from 'aws-cdk-lib/aws-cloudfront';
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
      // CloudFrontでキャッシュさせたい場合に使用すること
      const _serverCachePolicy = new CachePolicy(stack, 'ServerCache', {
        minTtl: Duration.seconds(86400),
        defaultTtl: Duration.seconds(86400),
        headerBehavior: CacheHeaderBehavior.allowList(
          'accept',
          'rsc',
          'next-router-prefetch',
          'next-router-state-tree',
          'next-url',
        ),
        enableAcceptEncodingGzip: true,
        enableAcceptEncodingBrotli: true,
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
        warm: 100,
        logging: 'combined',
        // cdk: {
        //   serverCachePolicy,
        // },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
