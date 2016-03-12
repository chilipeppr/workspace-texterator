/* global cpdefine chilipeppr cprequire */
cprequire_test(["inline:com-zipwhip-workspace-texterator"], function(ws) {

    console.log("initting workspace");

    /**
     * The Root workspace (when you see the ChiliPeppr Header) auto Loads the Flash 
     * Widget so we can show the 3 second flash messages. However, in test mode we
     * like to see them as well, so just load it from the cprequire_test() method
     * so we have similar functionality when testing this workspace.
     */
    var loadFlashMsg = function() {
        $('body').prepend('<div id="testDivForFlashMessageWidget"></div>');
        chilipeppr.load("#testDivForFlashMessageWidget",
            "http://fiddle.jshell.net/chilipeppr/90698kax/show/light/",
            function() {
                console.log("mycallback got called after loading flash msg module");
                cprequire(["inline:com-chilipeppr-elem-flashmsg"], function(fm) {
                    //console.log("inside require of " + fm.id);
                    fm.init();
                });
            }
        );
    };
    loadFlashMsg();

    // Init workspace
    ws.init();

    // Do some niceties for testing like margins on widget and title for browser
    $('title').html("Texterator Workspace");
    $('body').css('padding', '10px');

} /*end_test*/ );

// This is the main definition of your widget. Give it a unique name.
cpdefine("inline:com-zipwhip-workspace-texterator", ["chilipeppr_ready"], function() {
    return {
        /**
         * The ID of the widget. You must define this and make it unique.
         */
        id: "com-zipwhip-workspace-texterator", // Make the id the same as the cpdefine id
        name: "Workspace / Texterator", // The descriptive name of your widget.
        desc: `This workspace is for the Zipwhip Texterator. Multiple TinyG control boards are connected in parallel to control different parts of the Texterator including a beer dispenser, red solo cup laser etching, a cup dispenser, and a rotational stage. `,
        url: "(auto fill by runme.js)", // The final URL of the working widget as a single HTML file with CSS and Javascript inlined. You can let runme.js auto fill this if you are using Cloud9.
        fiddleurl: "(auto fill by runme.js)", // The edit URL. This can be auto-filled by runme.js in Cloud9 if you'd like, or just define it on your own to help people know where they can edit/fork your widget
        githuburl: "(auto fill by runme.js)", // The backing github repo
        testurl: "(auto fill by runme.js)", // The standalone working widget so can view it working by itself

        foreignSubscribe: {
            "/com-chilipeppr-elem-dragdrop/ondragover": "The Chilipeppr drag drop element will publish on channel /com-chilipeppr-elem-dragdrop/ondropped when a file is dropped so we subscribe to it so we can load a Gcode file when the user drags it onto the browser. It also adds a hover class to the bound DOM elem so we can add a CSS to hilite on hover",
            "/com-chilipeppr-elem-dragdrop/ondragleave": "We need to know when the drag is over to remove the CSS hilites.",
            "/com-chilipeppr-widget-gcode/resize": "We watch if the Gcode viewer resizes so that we can reposition or resize other elements in the workspace. Specifically we ask the Serial Port Console to resize. We also redraw the 3D Viewer so it fills the whole screen."
        },

        foreignPublish: {},

        /**
         * Keep reference to TinyG workspace
         */
        tinygws: null, 
        /**
         * The workspace's init method. It loads the all the widgets contained in the workspace
         * and inits them.
         */
        init: function() {
 
            var that = this;
            
            // we load the TinyG workspace and then we modify it afterwards
            this.loadTinyGWorkspace(function() {
                // $('#com-chilipeppr-ws-gcode-hdr .workspace-title').text("Texterator Workspace");
                $('#com-chilipeppr-ws-gcode-hdr .workspace-title').html('<img class="workspace-img" src="https://github.com/chilipeppr/workspace-texterator/raw/master/logo.png">');

                // load zipwhip recieve text widget
                $('#com-chilipeppr-ws-menu .zipwhip-recvtext-button').trigger("click");
                
                // Inject the Texterator widget
                $('<div class="zhigh" id="com-chilipeppr-ws-texterator"></div>')
                    .insertAfter('#com-chilipeppr-ws-zipwhip-recvtext');

                chilipeppr.load(
                  "#com-chilipeppr-ws-texterator",
                  "http://raw.githubusercontent.com/chilipeppr/widget-texterator/master/auto-generated-widget.html",
                  function() {
                    // Callback after widget loaded into #myDivComZipwhipWidgettexterator
                    // Now use require.js to get reference to instantiated widget
                    cprequire(
                      ["inline:com-zipwhip-widget-texterator"], // the id you gave your widget
                      function(myObjComZipwhipWidgettexterator) {
                        // Callback that is passed reference to the newly loaded widget
                        console.log("Widget / Texterator just got loaded.", myObjComZipwhipWidgettexterator);
                        myObjComZipwhipWidgettexterator.init();
                      }
                    );
                  }
                );
                
                // Inject the SVG2Gcode widget
                $('<div class="zhigh" id="com-chilipeppr-ws-svg2gcode"></div>')
                    .insertAfter('#com-chilipeppr-ws-zipwhip-recvtext');

                chilipeppr.load(
                  "#com-chilipeppr-ws-svg2gcode",
                  "http://raw.githubusercontent.com/chilipeppr/widget-svg2gcode/master/auto-generated-widget.html",
                  function() {
                    // Callback after widget loaded into #myDivComZipwhipWidgetSvg2gcode
                    // Now use require.js to get reference to instantiated widget
                    cprequire(
                      ["inline:com-zipwhip-widget-svg2gcode"], // the id you gave your widget
                      function(myObjComZipwhipWidgetSvg2gcode) {
                        // Callback that is passed reference to the newly loaded widget
                        console.log("Widget / svg2gcode just got loaded.", myObjComZipwhipWidgetSvg2gcode);
                        //myObjComZipwhipWidgetSvg2gcode.init();
                      }
                    );
                  }
                );

                
                // Inject the Font2Gcode widget
                $('<div class="zhigh" id="com-chilipeppr-ws-font2gcode"></div>')
                    .insertAfter('#com-chilipeppr-ws-zipwhip-recvtext');

                chilipeppr.load(
                  "#com-chilipeppr-ws-font2gcode",
                  "http://raw.githubusercontent.com/chilipeppr/widget-font2gcode/master/auto-generated-widget.html",
                  function() {
                    // Callback after widget loaded into #myDivComZipwhipWidgetFont2gcode
                    // Now use require.js to get reference to instantiated widget
                    cprequire(
                      ["inline:com-zipwhip-widget-font2gcode"], // the id you gave your widget
                      function(myObjComZipwhipWidgetFont2gcode) {
                        // Callback that is passed reference to the newly loaded widget
                        console.log("Widget / Font2Gcode just got loaded.", myObjComZipwhipWidgetFont2gcode);
                        myObjComZipwhipWidgetFont2gcode.init();
                      }
                    );
                  }
                );

                // Hide some stuff
                $('.autolevel-button').hide();
                $('.jscut-button').hide();
                $('.eagle-button').hide();
                $('.shuttlexpress-button').hide();
                $('.lasersolder-button').hide();
                
                that.loadWorkspaceMenu();
                
                // now resize to make manual sizing widgets look ok
                $(window).trigger("resize");
            });
            
        },
        /**
         * Returns the billboard HTML, CSS, and Javascript for this Workspace. The billboard
         * is used by the home page, the workspace picker, and the fork pulldown to show a
         * consistent name/image/description tag for the workspace throughout the ChiliPeppr ecosystem.
         */
        getBillboard: function() {
            var el = $('#' + this.id + '-billboard').clone();
            el.removeClass("hidden");
            el.find('.billboard-desc').text(this.desc);
            return el;
        },
        /**
         * Inject the billboard into the Workspace upper right corner pulldown which
         * follows the standard template for workspace pulldown menus.
         */
        addBillboardToWorkspaceMenu: function() {
            // get copy of billboard
            var billboardEl = this.getBillboard();
            $('#' + this.id + ' .com-chilipeppr-ws-billboard').append(billboardEl);
        },
        /**
         * Listen to window resize event.
         */
        setupResize: function() {
            $(window).on('resize', this.onResize.bind(this));
        },
        /**
         * When browser window resizes, forcibly resize the Console window
         */
        onResize: function() {
            if (this.widgetConsole) this.widgetConsole.resize();
        },
        /**
         * Load the TinyG Workspace via chilipeppr.load()
         */
        loadTinyGWorkspace: function(callback) {

            var that = this;

            chilipeppr.load(
                "#com-chilipeppr-workspace-tinyg-instance",
                "http://raw.githubusercontent.com/chilipeppr/workspace-tinyg/master/auto-generated-workspace.html",
                function() {
                    console.log("mycallback got called after loading tinyg workspace");
                    cprequire(["inline:com-chilipeppr-workspace-tinyg"], function(tinygws) {
                        that.tinygws = tinygws;
                        that.tinygws.init();

                        if (callback) callback(tinygws);

                    });
                }
            );
        },
        /**
         * Load the workspace menu and show the pubsubviewer and fork links using
         * our pubsubviewer widget that makes those links for us.
         */
        loadWorkspaceMenu: function(callback) {
            // Workspace Menu with Workspace Billboard
            var that = this;
            chilipeppr.load(
                "http://raw.githubusercontent.com/chilipeppr/widget-pubsubviewer/master/auto-generated-widget.html",
                function() {
                    require(['inline:com-chilipeppr-elem-pubsubviewer'], function(pubsubviewer) {

                        var el = $('#' + that.id + ' #com-chilipeppr-ws-menu .dropdown-menu-ws');
                        console.log("got callback for attachto menu for workspace. attaching to el:", el);

                        pubsubviewer.attachTo(
                            el,
                            that,
                            "Workspace"
                        );

                        if (callback) callback();
                    });
                }
            );
        },

    }
});