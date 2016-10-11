REPORTER = list
MOCHA_OPTS = --ui bdd

test:
	clear
	echo Starting test *********************************************************
	./node_modules/.bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	test/*.js
	echo Ending test

.PHONY: test