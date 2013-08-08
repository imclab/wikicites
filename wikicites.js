// Generated by CoffeeScript 1.6.2
(function() {
  var WikiCites, os, request, url, wikichanges,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  os = require('os');

  url = require('url');

  request = require('request');

  wikichanges = require('wikichanges');

  WikiCites = (function() {
    function WikiCites(opts) {
      var w;

      if (opts == null) {
        opts = {};
      }
      this.channels = opts.channels || ((function() {
        var _results;

        _results = [];
        for (w in wikichanges.wikipedias) {
          _results.push(w);
        }
        return _results;
      })());
      this.ircNickname = opts.ircNickname || "wikicites-" + os.hostname();
    }

    WikiCites.prototype.listen = function(callback) {
      var changes, _newCites, _parseCite,
        _this = this;

      changes = new wikichanges.WikiChanges({
        ircNickname: 'wikilinks',
        wikipedias: this.channels
      });
      changes.listen(function(change) {
        var changeUrl, prevRevId, qs, revId, self, wikipedia;

        if (change.delta <= 0) {
          return;
        }
        changeUrl = url.parse(change.url, 'parse-query');
        revId = changeUrl.query['diff'];
        prevRevId = changeUrl.query['oldid'];
        wikipedia = change.wikipediaUrl + "/w/api.php";
        qs = {
          action: 'query',
          prop: 'revisions',
          rvprop: 'content',
          titles: change.page,
          rvstartid: revId,
          rvlimit: 2,
          format: 'json'
        };
        self = _this;
        return request.get(wikipedia, {
          qs: qs,
          json: true
        }, function(e, r, results) {
          var cite, page, pageId, _ref, _results;

          _ref = results.query.pages;
          _results = [];
          for (pageId in _ref) {
            page = _ref[pageId];
            _results.push((function() {
              var _i, _len, _ref1, _results1;

              _ref1 = _newCites(page.revisions);
              _results1 = [];
              for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                cite = _ref1[_i];
                cite.change = change;
                _results1.push(callback(cite));
              }
              return _results1;
            })());
          }
          return _results;
        });
      });
      _newCites = function(revisions) {
        var cite, cites, currCites, m, prevCites, _i, _len;

        cites = [];
        m = /{{(cite .+?)}}/g;
        if ((revisions != null) && revisions.length === 2) {
          prevCites = revisions[1]['*'].match(m);
          currCites = revisions[0]['*'].match(m);
          if (currCites && prevCites) {
            for (_i = 0, _len = currCites.length; _i < _len; _i++) {
              cite = currCites[_i];
              if (__indexOf.call(prevCites, cite) < 0) {
                cites.push(_parseCite(cite));
              }
            }
          }
        }
        return cites;
      };
      return _parseCite = function(citeText) {
        var cite, m, p, parts, _i, _len;

        parts = (function() {
          var _i, _len, _ref, _results;

          _ref = citeText.split('|');
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            p = _ref[_i];
            _results.push(p.replace(/^\s+|\s+$/g, ''));
          }
          return _results;
        })();
        cite = {
          type: parts.shift().split(' ')[1]
        };
        for (_i = 0, _len = parts.length; _i < _len; _i++) {
          p = parts[_i];
          m = p.match(/^(.+?)=(.+)$/);
          if (m) {
            cite[m[1]] = m[2];
          }
        }
        return cite;
      };
    };

    return WikiCites;

  })();

  exports.WikiCites = WikiCites;

}).call(this);
