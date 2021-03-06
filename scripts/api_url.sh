#!/bin/sh

if [ "$BUILD_ENV" = "prod"  ]; then
  echo "Production build, replacing API URL..."
  sed -Ei "s/(export const backendUrl =).*/\1 'https\:\/\/aws.thatsocialapp.com\/admin\/';/g"  src/services/credentials.service.ts
elif [ "$BUILD_ENV" = "dev"  ]; then
  echo "Developemnt build, replacing API URL..."
  sed -Ei "s/(export const backendUrl =).*/\1 'https\:\/\/aws-dev.thatsocialapp.com\/admin\/';/g"  src/services/credentials.service.ts
else
  echo "Skiping API replacement..."
fi
