import { SSTConfig } from 'sst';
import { NextjsSite } from 'sst/constructs';
import { HttpOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
import {
  AllowedMethods,
  CachePolicy,
  OriginProtocolPolicy,
  OriginRequestPolicy,
  ViewerProtocolPolicy,
} from 'aws-cdk-lib/aws-cloudfront';

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
      // APIへ飛ばすビヘイビア
      const apiBehavior = {
        origin: new HttpOrigin(`api.${domain}`, {
          protocolPolicy: OriginProtocolPolicy.MATCH_VIEWER,
        }),
        viewerProtocolPolicy: ViewerProtocolPolicy.ALLOW_ALL,
        allowedMethods: AllowedMethods.ALLOW_ALL,
        cachePolicy: CachePolicy.CACHING_DISABLED,
        originRequestPolicy: OriginRequestPolicy.ALL_VIEWER,
      };
      const site = new NextjsSite(stack, 'site', {
        customDomain: {
          domainName: domain,
          hostedZone: domain,
        },
        environment: {
          NEXT_PUBLIC_CUCULUS_API_URL: `https://api.${domain}`,
          SITE_URL: `https://${domain}`,
          STAGE: stack.stage,
        },
        warm: 100,
        memorySize: '2048 MB',
        logging: 'combined',
        cdk: {
          distribution: {
            additionalBehaviors: {
              '.well-known/*': apiBehavior,
              'ap/*': apiBehavior,
            },
          },
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
