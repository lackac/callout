# Callout

Callout is a Firefox extension which delivers an API for web pages and Greasemonkey scripts to notify the user through the notification system of the OS. This would be Growl for Mac OS X users and Windows notifications for Windows users. The extension creates the `callout` JavaScript object which is usable by both unprivileged JavaScript code and Greasemonkey scripts.

## Installation

Install the newest version from [addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/addon/7458/).

## Requirements

Callout supports Firefox 2.0+ on Windows and Linux and Firefox 3.0+ on Mac OS X. Mac OS X users will also need the [Growl](http://growl.info/) notification system. [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/748/) is only required for userscript support.

## Usage

Callout makes a `callout` JavaScript object available for all webpages and Greasemonkey scripts. The method creates a notification titled `title` and with the message `message`.

    callout.notify(title, message, [options])

The available options are:

* `icon`: with this you can specify an icon for the notification. This should be an URI for the icon. If unspecified the default Callout icon is used.
* `href`: this specifies a target page to go to if the user clicks on the notification. This page will be opened in a new tab or window.

### Examples

    // Simple usage
    callout.notify('Hello', 'World!');

    // Specifying an icon
    callout.notify('Hello World!', 'this is a ninja!',
                   {icon: 'http://icanscale.com/callout/images/ninja.png'});

    // Specifying a target page
    callout.notify('I Can Scale', 'My blog',
                   {href: 'http://icanscale.com/'});

### Loudspy

There is a more elaborate example in the examples directory for a Greasemonkey script which uses Callout. This script works on [Digg spy](http://digg.com/spy) and notifies the user of each new digg displayed on the page.

Warning: while this could be useful for the digg addict it is a serious distraction from work. :)

This user script can also be installed from the following address:
http://github.com/lackac/callout/raw/master/examples/loudspy.user.js

## Credits

**Author**: [László Bácsi](http://icanscale.com/)

**Hungarian blog post**: http://lackac.hu/articles/2008/03/26/rendszeruzenetek-firefoxbol-es-turulcsirip-growl

The original idea came from [András Bártházi](http://barthazi.hu/).

## Copyright

Copyright (c) 2008-2009 László Bácsi, released under the Mozilla Public License Version 1.1 (or alternatively GPL 2.0 or LGPL 2.1).
