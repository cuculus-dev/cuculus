import { GetServerSidePropsContext } from 'next';

type RobotsFile = {
  rules: { userAgent: string; disallow?: string }[];
  sitemap?: string;
};

function generateRobots(): RobotsFile {
  // Development robots.txt
  if (process.env.STAGE !== 'production') {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
    };
  }
  // Production robots.txt
  return {
    rules: [
      {
        userAgent: 'Yahoo Pipes 1.0',
        disallow: '/',
      },
      {
        userAgent: 'Livelapbot',
        disallow: '/',
      },
      {
        userAgent: 'Megalodon',
        disallow: '/',
      },
      {
        userAgent: 'ia_archiver',
        disallow: '/',
      },
    ],
    sitemap: process.env.SITE_URL + '/sitemaps.xml',
  };
}

function generateRobotsTxt(robotsFile: RobotsFile): string {
  const lines: string[] = [];

  robotsFile.rules.forEach((rule) => {
    lines.push(`User-agent: ${rule.userAgent}`);
    if (rule.disallow) {
      lines.push(`Disallow: ${rule.disallow}`);
    }
    lines.push('');
  });

  if (robotsFile.sitemap) {
    lines.push(`Sitemap: ${robotsFile.sitemap}`);
  }

  return lines.join('\n');
}

export function getServerSideProps({ res }: GetServerSidePropsContext) {
  const robotsFile = generateRobots();
  const robots = generateRobotsTxt(robotsFile);

  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.setHeader('Content-Type', 'text/plain');
  res.write(robots);
  res.end();

  return {
    props: {},
  };
}

export default function Robots() {
  // getServerSideProps will do the heavy lifting
}
