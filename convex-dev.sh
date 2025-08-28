#!/bin/bash
# Convex development wrapper script
export PATH="/nix/store/8y4ls7z2sfxbq6ch3yp45l28p29qswvx-nodejs-20.19.3-wrapped/bin:$PATH"
echo "Using Node.js version: $(node --version)"
echo "Using npm version: $(npm --version)"
echo "Starting Convex development server..."
npx convex dev
