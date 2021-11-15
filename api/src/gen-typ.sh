#!/bin/bash

tsc --esModuleInterop true gen-typ.ts;
node gen-typ.js
rm gen-typ.js