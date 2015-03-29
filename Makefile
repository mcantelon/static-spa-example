all:
	mkdir -p build
	browserify index.js -o build/bundle.js
