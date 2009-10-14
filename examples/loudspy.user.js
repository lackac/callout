// LoudSpy
// version 0.1
// 2008-04-04
// Copyright (c) 2008, László Bácsi, http://lackac.hu
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// You will also need the Callout extension: http://icanscale.com/callout/
// Install them then restart Firefox and revisit this script.
//
// To uninstall, go to Tools/Greasemonkey/Manage User Scripts,
// select "LoudSpy", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           LoudSpy
// @namespace      http://lackac.hu
// @description    Digg Spy + Growl (or Windows alerts or whatever)
// @include        http://digg.com/spy*
// ==/UserScript==

var LoudSpy = {
  init: function() {
    var addaline = unsafeWindow.addaline;
    if (addaline) {
      unsafeWindow.addaline = function(showanim) {
        var line = unsafeWindow.lines[0];
        if (line) {
          var m = line.match(/href="([^"]+)"/);
          var href = "http://digg.com" + m[1];
          m = line.match(/<strong>(.*)<\/strong>/)
          var title = m[1];
          m = line.match(/alt="([^"]*)"/)
          var type = m[1];
          m = line.match(/class="spy-diggcount">([+-]\d+)</)
          var diggs = m[1]
          callout.notify(type + ' ' + diggs, title, {icon:'http://digg.com/img/share-logo.gif', href:href});
        }
        addaline(showanim);
      }
    }
  }
}

addEventListener('load', function () { LoudSpy.init(); }, false);
