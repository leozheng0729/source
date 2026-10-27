# Deploy Highlighter Pen

This directory is a complete static website. Upload its contents and preserve every subdirectory. No application server or database is required.

## Public URL

The default public URL is https://pageink.app/, matching the extension's public policy links. Running pnpm run build:site updates canonical and hreflang links, the 109-URL sitemap.xml and the robots.txt sitemap reference. If the website moves, regenerate before publishing:

`PEN_SITE_URL=https://YOURNAME.github.io/YOURREPO/ pnpm run build:site`

Include the repository path for a project Pages site. All links in the generated sitemap must match the actual deployed URL.

## GitHub Pages

1. Set repository Settings → Pages → Source to GitHub Actions.
2. Use actions/configure-pages, actions/upload-pages-artifact (path: apps/ext-pen/static), and actions/deploy-pages in your deployment workflow. The deployment job needs pages: write and id-token: write permissions and the github-pages environment.
3. Alternatively, copy this directory's contents to the root of a dedicated Pages repository and publish that branch. .nojekyll is included.
4. Verify homepage, translated scenarios, comparison and policy links after deployment, then submit sitemap.xml in your search tools if desired.

robots.txt explicitly allows GPTBot, ClaudeBot and PerplexityBot. Robots and JSON-LD help discovery but do not guarantee indexing, rich results or AI citations.

## Editing

Generated pages come from scripts/build-site.mjs, scripts/site-copy.mjs and scripts/policy-copy.mjs. Product FAQ and plan text come from assets/locales. privacy.html is the existing privacy document. Terms and refund have 12 standalone language versions; their dropdown preserves the current page.

Run pnpm run test:site before deployment. Set PEN_SITE_OUTPUT to generate elsewhere. The build command never deploys the site.
