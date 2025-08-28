#!/bin/bash
# Setup Node.js 20 environment
export PATH="/nix/store/8y4ls7z2sfxbq6ch3yp45l28p29qswvx-nodejs-20.19.3-wrapped/bin:$PATH"
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"
