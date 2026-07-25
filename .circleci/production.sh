#!/usr/bin/env bash
set -euo pipefail

# dist/assets/* is content-hashed by vite → immutable 1yr
IMMUTABLE_CC='public, max-age=31536000, immutable'

# favicon and anything else copied from public/ is not hashed, changes rarely → 30d
ASSET_CC='public, max-age=2592000'

# index.html is the SPA entry and names the hashed assets, so it must refresh on deploy.
# Short browser max-age, long CloudFront edge age, the deploy invalidates the edge anyway.
HTML_CC='public, max-age=300, s-maxage=2592000, must-revalidate'

configure_aws_cli() {
  echo "Configure awscli"
  aws --version
  aws configure set default.output json
  if [ -n "${AWS_DEFAULT_REGION:-}" ]; then
    aws configure set default.region "$AWS_DEFAULT_REGION"
  fi
}

s3_sync() {
  echo "Syncing content-hashed assets (immutable) to s3"
  # No --delete here. A client can hold index.html for up to the HTML max-age, and it
  # references the previous build's hashes. Deleting them immediately 404s those clients.
  # Orphaned hashes need a bucket lifecycle rule on assets/ to expire, see docs/BACKLOG.md.
  aws s3 sync ./dist/assets "s3://$AWS_S3_BUCKET/assets" \
    --cache-control "$IMMUTABLE_CC"

  echo "Syncing other static assets to s3"
  aws s3 sync ./dist "s3://$AWS_S3_BUCKET" --delete \
    --exclude "index.html" --exclude "assets/*" \
    --cache-control "$ASSET_CC"

  echo "Uploading index.html"
  aws s3 cp ./dist/index.html "s3://$AWS_S3_BUCKET/index.html" \
    --cache-control "$HTML_CC" --content-type "text/html"
}

invalidate_cloudfront() {
  echo "Invalidate CloudFront"
  aws cloudfront create-invalidation --distribution-id "$AWS_CLOUDFRONT_ID" --paths "/*"
}

main() {
  configure_aws_cli
  s3_sync
  invalidate_cloudfront
}

main
