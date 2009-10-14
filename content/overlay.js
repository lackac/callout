/*
 * ***** BEGIN LICENSE BLOCK *****
 *   Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 * 
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Callout.
 *
 * The Initial Developer of the Original Code is
 * László Bácsi.
 * Portions created by the Initial Developer are Copyright (C) 2008
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 * 
 * ***** END LICENSE BLOCK *****
*/

const FROM_EXT = 0;
const FROM_GM = 1;
const FROM_WORLD = 2;

var Callout = {
  version: '0.3.2',
  icon: 'chrome://callout/content/callout.png',

  init: function() {
    this.initialized = true;
    var appcontent = document.getElementById("appcontent");
    if (appcontent) {
      appcontent.addEventListener("DOMContentLoaded", function(aEvent) {
        var win = aEvent.originalTarget.defaultView.wrappedJSObject;
        win.callout = new CalloutHandler(FROM_WORLD, win);
      }, true);
    }

    var gmSvc = Components.classes["@greasemonkey.mozdev.org/greasemonkey-service;1"];
    if (gmSvc) {
      this.patchGM(gmSvc.getService().wrappedJSObject);
    }
  },

  patchGM: function(gmSvc) {
    if (!gmSvc._calloutInstalled) {
      var original = gmSvc.evalInSandbox;
      gmSvc.evalInSandbox = function(code, codebase, sandbox, script) {
        sandbox.callout = new CalloutHandler(FROM_GM, sandbox.unsafeWindow);
        return original.call(gmSvc, code, codebase, sandbox, script);
      }
      gmSvc._calloutInstalled = true;
    }
  }
};
window.addEventListener("load", function(e) { Callout.init(); }, false);

function CalloutHandler(source, win) {
  this.Callout = Callout.version;

  this.notify = function(title, message, options) {
    var prefs = Components.classes["@mozilla.org/preferences-service;1"]
                          .getService(Components.interfaces.nsIPrefService);
    prefs = prefs.getBranch("extensions.callout.");
    var sourceAllowed = prefs.getIntPref("source");
    if (sourceAllowed < source) {
      return false;
    }

    if (!options) options = {};

    var alertsService = Components.classes["@mozilla.org/alerts-service;1"]
                                  .getService(Components.interfaces.nsIAlertsService);

    var urlRegexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    var match;
    if ((match = message.match(urlRegexp)) || options.href) {
      var clickHandler = {
        observe: function(subject, topic, data) {
          if (topic == "alertclickcallback") {
            gBrowser.selectedTab = gBrowser.addTab(data);
          }
        }
      }
      var url = options.href || match[0];
      alertsService.showAlertNotification(options.icon || Callout.icon,
        title, message, true, url, clickHandler);//, options.notifier || 'Callout'); // this should be available in FF3
    } else {
      alertsService.showAlertNotification(options.icon || Callout.icon,
        title, message, false, "", null);//, options.notifier || 'Callout'); // this should be available in FF3
    }
    return true;
  };
}
