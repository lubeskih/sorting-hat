#!/bin/bash

#export PATH="$PATH:$(yarn global bin)";
#cd ../prisma/; prisma migrate dev;

tsc --esModuleInterop true gen-typ.ts;
node gen-typ.js
rm gen-typ.js
