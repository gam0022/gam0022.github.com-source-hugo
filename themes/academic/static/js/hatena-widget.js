if (typeof Hatena == 'undefined')
    var Hatena = {};

if (typeof Hatena.BookmarkWidget == 'undefined') {
    Hatena.BookmarkWidget = new function () {
        this.callbacks = new Array;

        this.load = function (id) {
            loadCSS();
            var c = Hatena.BookmarkWidget;
            var callbackId = c.callbacks.length;
            var num = Math.max(1, Math.min(c.num, 10));
            if(id > -1) {
                var div = document.getElementById('hatena-bookmark-widget' + id);
                createDiv(id, num, div);
                c.callbacks[id] = createList(id, num);
                createRequest(id).call();
            } else {
                createDiv(callbackId, num);
                c.callbacks.push(createList(callbackId, num));
                loadJSONP(createRequest(callbackId));
            }
        };

        var themetable = {
            hatenadiary: {
                wrapper:'hatena-module',
                title:  'hatena-moduletitle',
                body:   'hatena-modulebody',
                footer: 'hatena-modulefooter',
                cssfile:'https://b.hatena.ne.jp/css/widget-hatenadiary.css'
            },
            notheme: {
                wrapper:'hatena-bookmark-widget-notheme',
                title:  'hatena-bookmark-widget-title',
                body:   'hatena-bookmark-widget-body',
                footer: 'hatena-bookmark-widget-footer',
                cssfile:''
            },
            other:  {
                wrapper:'hatena-bookmark-widget',
                title:  'hatena-bookmark-widget-title',
                body:   'hatena-bookmark-widget-body',
                footer: 'hatena-bookmark-widget-footer',
                cssfile:'https://b.hatena.ne.jp/css/widget.css'
            },
            base: 'hatena-bookmark'
        }

        var createDiv = function (callbackId, num, div) {
            var c = Hatena.BookmarkWidget;
            var theme = (themetable[c.theme] || themetable['other']);

            var li = [];
            li.push('<li class="isfirst"></li>');
            for(var i=1; i<num; i++)
                li.push('<li></li>');

            var ul = $E('ul');
            ul.innerHTML =  li.join('');
            var width = parseInt(Hatena.BookmarkWidget.width);

            var newdiv = $E('div', null,
              $E('div', {className: theme.title },
                $E('a', {href: 'https://b.hatena.ne.jp/entrylist?url='+c.url+'&sort='+c.sort },
                  $E('img', {src: 'https://b.hatena.ne.jp/images/widget/favicon.gif', valign: 'bottom' }),
                  c.title
                )
              ),
              $E('div', {className: theme.body}, ul),
              $E('div', {className: theme.footer},
                $E('a', {href: 'https://b.hatena.ne.jp' },
                  $E('span', null,  'Hatena::Bookmark')
                )
              )
            );
            var content = newdiv.innerHTML;

            if(div) {
                div.innerHTML = content;
                div.className = themetable.base + ' ' + theme.wrapper;
                div.style.width = width > 0 ? width + 'px' : null;
            } else {
                document.write([
                '<div',
                ' id="hatena-bookmark-widget', callbackId, '"',
                ' class="', themetable.base + ' ' + theme.wrapper, '"',
                width > 0 ? ' style="width: '+width+'px"' : null,
                '>',
                content,
                '</div>'
                ].join(''));
            }
        };
        var createList = function (callbackId, num) {
            return function (json) {
                var t = document.getElementById('hatena-bookmark-widget' + callbackId).getElementsByTagName('UL')[0];
                var li = [];
                if(json && json.length > 0) {
                    for(var i=0; i<num; i++) {
                        if(json[i]) {
                            var j = json[i];
                            var count = $E('a', {href: ('https://b.hatena.ne.jp/entry/' + j.link).replace('#', '%23') } , j.count + 'users');
                            t.replaceChild($E('li', null,
                                $E('a', {className: 'hatena-bookmark-entrytitle', href: j.link.replace('%23', '#')}, j.title),
                                $E('span', {className: 'hatena-bookmark-count'}, j.count > 10 ? $E('strong', null, count) : j.count >= 5 ? $E('em', null, count) : count)
                            ), t.childNodes[i]);
                        } else {
                            t.replaceChild($E('li'), t.childNodes[i]);
                        }
                    }
                } else {
                    t.replaceChild($E('li', null, $E('span', {className: 'hatena-bookmark-nocount' }, 'まだブックマークされていません')), t.childNodes[0]);
                }
            };
        };
        var createRequest = function(id) {
            var url = Hatena.BookmarkWidget.url;
            var sort = Hatena.BookmarkWidget.sort;
            return function () {
                var request = 'https://b.hatena.ne.jp/entrylist/json?' + [
                    'callback=Hatena.BookmarkWidget.callbacks['+ id +']',
                    'url='  + encodeURIComponent(url),
                    'sort=' + sort
                ].join('&');
                var script = $E('script', { defer: 'defer', type: 'text/javascript', charset: 'utf-8', src: request });
                document.getElementsByTagName('head')[0].appendChild(script)
            }
        };
        var loadCSS = function() {
            var theme = (themetable[Hatena.BookmarkWidget.theme] || themetable['other']);
            if(!theme.cssfile) return;
            var link = $E('link', { rel: 'stylesheet', type: 'text/css', href: theme.cssfile });
            theme.cssfile = null;
            document.getElementsByTagName('head')[0].appendChild(link);
        };
        var loadJSONP = function(func) {
            if (window.addEventListener && document.addEventListener) {
                var listener = function() {
                    try {
                        func && func.call();
                    } finally {
                        func = null;
                    }
                };
                document.addEventListener('DOMContentLoaded', listener, false);
                window.addEventListener('load', listener, false);
            } else if (typeof document.readyState !== 'undefined' &&
                       typeof document.documentElement.doScroll !== 'undefined') {
                var i = 0;
                (function() {
                    if (i++ > 2000) return func.call();
                    try {
                        if (document.readyState != 'loaded' && document.readyState != 'complete') {
                            document.documentElement.doScroll('left');
                        }
                    } catch(error) {
                        return setTimeout(arguments.callee, 13);
                    }
                    func.call();
                })();
            } else {
                func.call();
            }
        };
        var $E = function(tagName, attributes) {
            var elem = document.createElement(tagName);
            for (var a in attributes) {
              if (a == 'style') {
                for (var prop in attributes[a]) {
                  elem.style[prop] = attributes[a][prop];
                }
              } else {
                elem[a] = attributes[a];
              }
            }
            var children = Array.prototype.slice.call(arguments, 2);
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (typeof child == 'string')
                    child = document.createTextNode(child);
                if (!child)
                    continue;
                elem.appendChild(child);
            }
            return elem;
        };
    };
} else {
    for(i in ['url','title', 'sort', 'width', 'num', 'theme']) {
        Hatena.BookmarkWidget[i] = null;
    }
}
