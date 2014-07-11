#! /bin/usr/env bash

java -jar /usr/local/yuicompressor-2.4.7.jar libs/libs-all.js > libs/libs-min.js
java -jar /usr/local/yuicompressor-2.4.7.jar js/main-all.js > js/main-min.js