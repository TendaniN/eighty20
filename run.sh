#!/bin/bash

echo "Building..."

if [ ! -d "$HOME/.nvm" ]; then
	echo "Please install nvm first:"
    echo "  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash"
    echo "  nvm install 20.17.0"
	exit 1
fi

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

nvm use

npm i
if [ "$?" != "0" ]; then
	echo "NPM install failed. Check output"
	exit 1
fi

npm run dev
if [ "$?" != "0" ]; then
	echo "NPM dev server failed to run. Check output"
	exit 1
fi
