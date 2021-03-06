wikicites
=========

wikicites is a module that allows you to get a stream of recent citations 
out of Wikipedia(s) as JSON.  Citations are the bedrock of Wikipedia, since 
editors are interested in [verifiability not truth](https://en.wikipedia.org/wiki/Wikipedia:Verifiability,_not_truth) ... 
and citations are a big part of what makes verification possible.

Install
-------

1. get [nodejs](http://nodejs.org)
1. npm install wikicites

Use
---

### CoffeeScript

```coffeescript
WikiCites = require('wikicites').WikiCites

w = new WikiCites(channels: ["#en.wikipedia"])
w.listen (citation) ->
  console.log citation
```

### NodeJS

```javascript
var WikiCites = require('wikicites').WikiCites;

w = new WikiCites({channels: ["#en.wikipedia"]})
w.listen(function(citation) {
  console.log(citation);
});
```

### Citation Data 

In these two examples a callback is receiving a citation as it occurs in an edit
on Wikipedia. The citation is a JavaScript object that will look something like:

```javascript
{
  "type": "news",
  "last": "Crace",
  "first": "John",
  "title": "David Cesarani: The making of a defiant moderate",
  "url": "http://www.guardian.co.uk/education/2004/oct/12/academicexperts.highereducationprofile?INTCMP=SRCH",
  "accessdate": "19 April 2011",
  "newspaper": "The Guardian",
  "date": "12 October 2004",
  "change": {
    "channel": "#en.wikipedia",
    "flag": "",
    "page": "David Cesarani",
    "pageUrl": "http://en.wikipedia.org/wiki/David_Cesarani",
    "url": "http://en.wikipedia.org/w/index.php?diff=567685070&oldid=567623667",
    "delta": 511,
    "comment": "Reverted 1 edit by [[Special:Contributions/Red Stone Arsenal|Red Stone Arsenal]] ([[User talk:Red Stone Arsenal|talk]]): Get consensus for your change, drive by reverts every few months aint that. ([[WP:TW|TW]])",
    "wikipedia": "English Wikipedia",
    "wikipediaUrl": "http://en.wikipedia.org",
    "user": "Nableezy",
    "userUrl": "http://en.wikipedia.org/wiki/User:Nableezy",
    "unpatrolled": false,
    "newPage": false,
    "robot": false,
    "anonymous": false,
    "namespace": "Article"
  }
}
```

which would represent the following citation wikitext:

    {{cite news
      |last=Crace
      |first=John
      |title=David Cesarani: The making of a defiant moderate
      |url=http://www.guardian.co.uk/education/2004/oct/12/academicexperts.highereducationprofile?INTCMP=SRCH
      |accessdate=19 April 2011
      |newspaper=The Guardian
      |date=12 October 2004}}

In addition to the citation information you can see that the JSON object 
includes information about the change itself, what Wikipedia article the 
citation appears in, what Wikipedia the article belongs to, who made the edit, 
etc.

Develop 
-------

To hack on wikicites you'll need to clone this repository, install the 
dependencies, and then run the test suite with mocha:

    git checkout https://github.com/edsu/wikicites.git
    cd wikicites
    npm install
    node_modules/.bin/mocha 

If you use mocha with other projects you may want to install it globally which
will put it in your system PATH:

    npm install -g mocha

Some tests may spuriously fail if they timeout before an edit with a citation 
occurs on Wikipedia.

[![Build Status](https://travis-ci.org/edsu/wikicites.png?branch=master)](https://travis-ci.org/edsu/wikicites)

License
-------

* CC0
