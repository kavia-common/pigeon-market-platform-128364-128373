#!/bin/bash
cd /home/kavia/workspace/code-generation/pigeon-market-platform-128364-128373/frontend_react_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

