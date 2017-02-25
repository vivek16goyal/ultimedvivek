/**
 * @license Copyright 2014 Nathaniel Lord
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Nathaniel Lord http://www.nathaniellord.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
Slide Menu
 CSS Structure as follows:
 	.slide-menu
		.menu-items
			.menu-item
                .menu-header
                .menu-body
*/
//<!--<li class="menu-item" title="Panel 1">
//               <div class="menu-header">
//                   <div class="menu-icon">
//                       <i class="fa fa-bookmark-o"></i>
//                       <i class="fa fa-book"></i>
//                       <i class="fa fa-music"></i>
//                       <i class="fa fa-envelope"></i>
//                       <i class="fa fa-star"></i>
//                       <i class="fa fa-user"></i>
//                       <i class="fa fa-th-large"></i>
//                       <i class="fa fa-th-list"></i>
//                       <i class="fa fa-times"></i>
//                       <i class="fa fa-search-minus"></i>
//                       <i class="fa fa-signal"></i>
//                       <i class="fa fa-cog"></i>
//                       <i class="fa fa-clock-o"></i>
//                       <i class="fa fa-download"></i>
//                       <i class="fa fa-inbox"></i>

//                       <i class="fa fa-bank"></i>
//                       <i class="fa fa-ra"></i>
//                       <i class="fa fa-lock"></i>
//                       <i class="fa fa-volume-down"></i>
//                       <i class="fa fa-headphones"></i>
//                       <i class="fa fa-qrcode"></i>
//                       <i class="fa fa-tag"></i>
//                       <i class="fa fa-font"></i>
//                       <i class="fa fa-times"></i>
//                       <i class="fa fa-search-minus"></i>
//                       <i class="fa fa-dedent"></i>
//                       <i class="fa fa-cog"></i>
//                       <i class="fa fa-clock-o"></i>
//                       <i class="fa fa-download"></i>
//                       <i class="fa fa-home"></i>

//                   </div>
//                   <div class="menu-content">
//                       <span>Panel 1</span>
//                   </div>
//                   <div class="menu-close">
//                       <i class="fa fa-times"></i>
//                   </div>
//               </div>
//               <div class="menu-body">
//                   <h1>Panel 1 Contents</h1>
//                   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec nisi pharetra, iaculis tellus ut, pharetra justo. Etiam congue nunc feugiat nibh ullamcorper, vel condimentum nulla tempus. Nunc sed erat urna. Nunc quis odio ex. Nullam
//nec enim vel odio mollis euismod. Nullam non justo tortor. Duis nec mi et lectus commodo laoreet. Maecenas sed arcu vel lorem pellentesque sollicitudin sit amet eget magna. Aenean vehicula ornare tortor vel congue. Fusce id dapibus
//magna. Sed et nunc malesuada, elementum elit eu, tincidunt elit. In volutpat sapien nec mauris interdum, quis faucibus ex venenatis. Sed leo mauris, commodo sit amet justo in, dignissim convallis enim. Quisque interdum sem non
//nisl commodo, semper sagittis augue interdum.</p>

//<p>In aliquet sed quam nec sodales. Nulla facilisi. Nunc a turpis efficitur, interdum felis sit amet, commodo quam. Etiam elementum pharetra pulvinar. Nunc hendrerit mi eu nibh consectetur dignissim. Vestibulum non rhoncus purus, a porta
//sapien. Morbi consectetur aliquet enim, eu iaculis turpis sagittis non. Etiam accumsan, nisl sed lacinia consectetur, erat metus fermentum massa, vel ultricies justo lorem a quam. Quisque interdum diam neque, vel pharetra lorem
//hendrerit at. Quisque a gravida diam. Sed viverra lacus id hendrerit mattis.</p>

//<p>Integer cursus eget nisl auctor dictum. Vivamus mi risus, aliquam sollicitudin nunc ut, posuere efficitur velit. Mauris a semper turpis, sed porttitor risus. Duis ut dictum est, fringilla iaculis metus. Sed scelerisque enim ac erat
//ultricies, quis viverra ex dignissim. Sed vel tellus nisi. Aenean vestibulum, augue et varius suscipit, mauris dolor commodo nulla, nec viverra leo mi sit amet lectus. Fusce egestas vel tortor ac posuere. Vestibulum lorem orci,
//gravida a ultricies non, pellentesque quis lectus. Morbi ultricies viverra posuere. Donec viverra tortor ac lorem venenatis lacinia. Donec efficitur magna nec nisl tempus, id imperdiet lectus fermentum. Vivamus at ipsum purus.</p>

//<p>Sed imperdiet, lectus quis consequat viverra, neque augue porttitor justo, vestibulum venenatis velit purus eu ante. Nulla bibendum lorem ac porttitor convallis. Curabitur interdum diam sit amet tempor mollis. Fusce ligula enim, cursus
//sed tortor in, blandit blandit justo. Nam volutpat, mauris a scelerisque consectetur, quam ante mattis sem, ut gravida lectus quam non tellus. Aliquam tortor turpis, porta facilisis odio vel, accumsan molestie magna. Mauris quis
//neque nec diam commodo ornare id id odio. Curabitur vulputate euismod pretium. Curabitur consequat vitae ipsum eu posuere. Aliquam ultrices fermentum turpis, a rutrum urna molestie in. Quisque aliquet malesuada orci, a hendrerit
//odio aliquam a. Nulla facilisi. Donec mattis sem lacus, vel gravida augue pellentesque vitae. Aenean a fringilla metus.</p>

//<p>Aenean in tempor dui. Vivamus at arcu tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas odio orci, dapibus in tellus id, semper euismod risus. Quisque rhoncus eros vitae lectus sodales, ut molestie sem
//sodales. Suspendisse eu libero vel felis consequat egestas. Nulla lobortis diam eget interdum porttitor. Donec et nunc molestie, feugiat dui id, luctus nisl.</p>
//</div>
//</li>-->
(function($) {
    'use strict';
    var SlideMenu = function(element, options) {
        this.element = null;
        this.options = null;
        this.init('slideMenu', element, options);
    };

    SlideMenu.VERSION = '0.1.2';
    SlideMenu.SLIDE_SPEED = 0.5;
    SlideMenu.DEFAULTS = {
        side: "right",
        panelDirection: "vertical",
        iconWidth: "",
        panelWidth: "",
        autoIconWidth: true,
        autoPanelWidth: true,
        initialized: false,
        enabled: true,
        show: false,
        top: "",
        bottom: ""
    };
    var CLASSES = {
        ACTIVE: "active",
        OPEN: "open",
        CLOSED: "closed",
    };
    var EVENTS = {
        OPENED: "slidemenu.openend",
        CLOSED: "slidemenu.closed",
        BEFORE_OPEN: "slidemenu.beforeOpen",
        BEFORE_CLOSE: "slidemenu.beforeClose"
    };

    SlideMenu.prototype.init = function(type, element, options) {
        this.$element = $(element);
        this.options = this.getOptions(options);

        if (this.options.initialized) {
            console.log("Menu is already initialized. Destroy the menu before trying to initialize again.");
            return;
        }
        if (this.$element.hasClass("left-side")) this.options.side = "left";

        if (document.readyState !== 'complete') $(document).on("ready", this.resize());
        else this.resize();
        var instance = this;
        $(window).resize(function(event) {
            SlideMenu.prototype.resize.apply(instance);
        });

        var top = 0;
        $(".menu-item", this.$element).each(function(index, element) {
            $(element).css("position", "absolute");
            $(element).attr("data-index", index);
            $(element).css("top", top + "px");
            top += $(element).height();
        });

        this.$element.off("click").on("click", ".menu-item", this, this.menuClick);
    };

    SlideMenu.prototype.menuClick = function(event) {
        var instance = event.data;
        if ($(event.currentTarget).hasClass(CLASSES.ACTIVE)) { //Close this menu item since it's the only one open
            instance.close(event, instance);
        } else if ($(event.currentTarget).parents(".slide-menu").hasClass(CLASSES.ACTIVE)) { //Close open menu and move new menu into place
            instance.switchMenus(event, instance);
        } else { //Open the menu that was selected
            instance.openMenu(event, instance);
        }
    };

    SlideMenu.prototype.getDefaults = function() {
        return SlideMenu.DEFAULTS;
    };

    SlideMenu.prototype.getOptions = function(options) {
        options = $.extend({}, this.getDefaults(), this.$element.data(), options);
        if (options.iconWidth !== "") {
            options.autoIconWidth = false;
        }
        if (options.panelWidth !== "") {
            options.autoPanelWidth = false;
        }
        return options;
    };

    SlideMenu.prototype.resize = function() {
        var changed = false;
        //Perform calculations
        var topOffset = 0;
        if (typeof(this.options.top) == "number") {
            topOffset = this.options.top;
            this.$element.css("top", this.options.top + "px");
        }
        var bottomOffset = 0;
        if (typeof(this.options.bottom) === "number") {
            bottomOffset = this.options.bottom;
        }
        var menuHeight = $(window).height() - topOffset - bottomOffset;
        if (menuHeight != this.$element.height()) {
            changed = true;
        }
        if (this.options.autoIconWidth && $(".menu-icon", this.$element).outerWidth(true) > this.options.iconWidth) {
            this.options.iconWidth = $(".menu-icon", this.$element).outerWidth(true);
            changed = true;
        }
        this.options.panelWidth = 250;
        this.options.width = this.options.panelWidth + this.options.iconWidth;
        //Init Once

        if (this.options.show === false) this.show();

        if (changed) {
            this.$element.width(this.options.width);
            this.$element.height(menuHeight).css("top", topOffset);
            if (this.options.side == "right") {
                var itemsLeft = -this.options.iconWidth - parseInt($(".menu-items", this.$element).css("border-left-width"));
                //$(".menu-items", this.$element).css("left", itemsLeft + "px");
                itemsLeft = '-17';
                $(".menu-items", this.$element).css("left", itemsLeft + "vmin");
            } else {

            }
            $(".menu-close", this.$element).css("width", this.options.iconWidth + "px");
        }
    };

    SlideMenu.prototype.openMenu = function(event, instance) {
        instance.$element.trigger(EVENTS.BEFORE_OPEN);
        instance.$element.addClass(CLASSES.ACTIVE);
        $(event.currentTarget).addClass(CLASSES.ACTIVE);
        var left, leftBorder;

        var movement = {};
        console.log(instance.options.width);
        if (instance.options.side == "right") {
            leftBorder = parseInt($(".menu-items", instance.$element).css("border-left-width"));
            left = parseInt($(".menu-items", instance.$element).css("left"));
            movement = {
                //left: parseInt(-instance.options.width - left - leftBorder) + "px"
                left: "-80vmin"
            };
        } else if (instance.options.side == "left") {
            left = parseInt($(".menu-items", instance.$element).css("left"));
            movement = {
                right: parseInt(-instance.options.width + instance.options.iconWidth) + "px"
            };
        }
        var optionObj = {
            duration: 250,
            complete: function() {
                if ($(".menu-item." + CLASSES.ACTIVE, instance.$element).css("top") != "0px") {
                    instance.reorder(function() {
                        instance.$element.trigger(EVENTS.OPENED);
                        instance.openPanel($(event.currentTarget));
                    });
                } else {
                    instance.$element.trigger(EVENTS.OPENED);
                    instance.openPanel($(event.currentTarget));
                }
            }
        };
        $(".menu-item." + CLASSES.ACTIVE, instance.$element).animate(movement, optionObj);
    };

    SlideMenu.prototype.switchMenus = function(event, instance) {
        instance.closePanel();
        var left, leftBorder;
        //Slide new menu out
        var movement = {};
        if (instance.options.side == "right") {
            leftBorder = parseInt($(".menu-items", instance.$element).css("border-left-width"));
            left = parseInt($(".menu-items", instance.$element).css("left"));
            movement = {
                //left: parseInt(-instance.options.width - left - leftBorder) + "px"
                left: "-80vmin"
            };
        } else if (instance.options.side == "left") {
            left = parseInt($(".menu-items", instance.$element).css("left"));
            
            movement = {
                right: parseInt(-instance.options.width + instance.options.iconWidth) + "px"
            };
        }
        var switchOpts = {
            duration: 250,
            complete: function() {
                instance.reorder(function() {
                    instance.openPanel($(event.currentTarget).data("target"));
                });
            }
        };
        $(event.currentTarget).stop().animate(movement, switchOpts);
        //Slide current menu in
        movement = {};
        if (instance.options.side == "right") {
            movement = {
                left: "0px"
            };
        } else if (instance.options.side == "left") {
            movement = {
                right: "0px"
            };
        }
        $(".menu-item." + CLASSES.ACTIVE, instance.$element).animate(movement, 250, function() {
            $(this).removeClass(CLASSES.ACTIVE);
        });
        $(".menu-item." + CLASSES.ACTIVE, instance.$element).removeClass(CLASSES.ACTIVE);
        $(event.currentTarget).addClass(CLASSES.ACTIVE);
    };

    SlideMenu.prototype.close = function(callback) {
        this.$element.trigger(EVENTS.BEFORE_CLOSE);
        var instance = this;
        var movement = {};
        if (instance.options.side == "right") {
            movement = {
                left: "0px"
            };
        } else if (this.options.side == "left") {
            movement = {
                right: "0px"
            };
        }
        this.closePanel();
        var closeOpts = {
            duration: 250,
            complete: function() {
                instance.$element.removeClass(CLASSES.ACTIVE);
                instance.$element.trigger(EVENTS.CLOSED);
                if (typeof(callback) == "function") callback();
                $(".menu-item." + CLASSES.ACTIVE, instance.$element).removeClass(CLASSES.ACTIVE);
                //Move tiles back to their places
                instance.reorder();
            }
        };
        $(".menu-item." + CLASSES.ACTIVE, instance.$element).stop().animate(movement, closeOpts);
    };

    SlideMenu.prototype.openPanel = function(target) {
        $(target, this.$element).addClass(CLASSES.ACTIVE);
        if (this.options.panelDirection == "vertical") {
            $(".active .menu-body", this.$element).animate({
                height: this.$element.height() - $(".active .menu-header").height() + "px"
            }, 250, 'linear');
        } else if (this.options.panelDirection == "horizontal") {

        }
    };

    SlideMenu.prototype.closePanel = function(callback) {
        var instance = this;
        var movement = {};
        var $panel = $(".active .menu-body", instance.$element);
        $panel.css("z-index", "-1");
        /*var closeOpts = {
            duration: 250,
            complete: function() {
                $panel.css({
                    "height": "0",
                    "z-index": ""
                });
            }
        };
        $panel.stop().animate(movement, closeOpts);*/
        window.setTimeout(function() {
            $panel.css({
                "height": "0",
                "z-index": ""
            });
        }, 250);
    };

    SlideMenu.prototype.open = function(target) {
        $(".menu-item[data-target='" + target + "']", this.$element).click();
    };

    SlideMenu.prototype.hide = function(callback) {
        //Slide the menu out the side
        var instance = this;
        if (this.isOpen()) instance.close(
            function() {
                hideSlideMenu();
            }
        );
        else hideSlideMenu();

        function hideSlideMenu() {
            if (instance.options.side == "right") {
                $(".menu-items", instance.$element).animate({
                    left: "0px"
                }, 250);
            } else {
                $(".menu-items", instance.$element).animate({
                    left: -instance.options.width + "px"
                }, 250);
            }
            instance.options.show = false;
        }
    };

    SlideMenu.prototype.show = function(callback) {
        if (this.options.show === true) return;
        var instance = this,
            animateOptions, itemsLeft;
        //Slide the menu in from the side
        if (parseInt($(".menu-items", instance.$element).css("right")) === 0 || parseInt($(".menu-items", instance.$element).css("left")) === 0) {
            if (this.options.side == "right") {
                itemsLeft = -instance.options.iconWidth - parseInt($(".menu-items", instance.$element).css("border-left-width"));
                animateOptions = {
                    duration: 250,
                    complete: function() {
                        instance.options.show = true;
                        instance.resize();
                        if (typeof(callback) == "function") callback();
                    }
                };
                $(".menu-items", instance.$element).css("left", "0px").animate({
                    left: itemsLeft + "px"
                }, animateOptions);
            } else {
                itemsLeft = -instance.options.width + instance.options.iconWidth;
                animateOptions = {
                    duration: 250,
                    complete: function() {
                        instance.options.show = true;
                        instance.resize();
                        if (typeof(callback) == "function") callback();
                    }
                };
                $(".menu-items", instance.$element).css("left", -instance.options.width + "px").animate({
                    left: itemsLeft + "px"
                }, animateOptions);
            }
        }
        instance.options.initialized = true;
    };

    SlideMenu.prototype.addTab = function(args) {
        //Get ID from content
        var tab = $(args.tab);
        if ($(tab).hasClass("menu-item") === false) $(tab).addClass("menu-item");
        $(".menu-items", this.$element).append(tab);
        this.reorder();
    };

    SlideMenu.prototype.removeTab = function(target) {
        $(".menu-item[data-target='" + target + "']", this.$element).replaceWith("");
        $(target, this.$element).replaceWith("");
        this.reorder();
    };

    SlideMenu.prototype.hideTab = function(target) {
        if ($(".menu-item[data-target='" + target + "']", this.$element).hasClass(CLASSES.ACTIVE)) {
            //If panel is open then close the menu
            var instance = this;
            this.close(function() {
                $(".menu-item[data-target='" + target + "']", instance.$element).hide();
            });
        } else {
            $(".menu-item[data-target='" + target + "']", this.$element).hide();
            //Rearrange tiles
            this.reorder();
        }
    };

    SlideMenu.prototype.showTab = function(target) {
        $(".menu-item[data-target='" + target + "']", this.$element).show();
        //Rearrange tiles
        this.reorder();
    };

    SlideMenu.prototype.changePosition = function(args) {
        var target = args.target;
        var position = args.position;
        var item = $(".menu-item[data-target='" + target + "']", this.$element);
        $(".menu-item[data-target='" + target + "']", this.$element).replaceWith("");
        if (position == 1) {
            $(".menu-items", this.$element).prepend(item);
        } else {
            $(".menu-item:nth-child(" + parseInt(position - 1) + ")", this.$element).after(item);
        }
        this.reorder();
    };

    SlideMenu.prototype.reorder = function(callback) {
        var top = 0;
        if ($(".menu-item." + CLASSES.ACTIVE, this.$element).css("top") == "0px") {
            if (typeof(callback) === "function") callback();
        } else {
            if ($(".menu-item." + CLASSES.ACTIVE, this.$element).length > 0) {
                var animateOptions = {
                    duration: 250,
                    complete: function() {
                        if (typeof(callback) === "function") callback();
                    }
                };
                $(".menu-item." + CLASSES.ACTIVE, this.$element).animate({
                    top: top + "px"
                }, animateOptions);
                top += $(".menu-item." + CLASSES.ACTIVE, this.$element).height();
            }
        }
        //If there is an open tab then move the first element below it
        if ($(".menu-item." + CLASSES.ACTIVE).length) top = $(".menu-item." + CLASSES.ACTIVE).height();
        $(".menu-item:visible", this.$element).each(function(index, element) {
            if ($(element).hasClass(CLASSES.ACTIVE) === false) {
                $(element).animate({
                    top: top + "px"
                }, 250);
                top += $(element).height();
            }
        });
    };

    SlideMenu.prototype.disable = function(target) {
        this.options.enabled = false;
    };

    SlideMenu.prototype.enable = function(target) {
        this.options.enabled = true;
    };

    SlideMenu.prototype.isOpen = function() {
        return this.$element.hasClass(CLASSES.ACTIVE);
    };

    SlideMenu.prototype.destroy = function() {
        this.$element.css("width", "").css("height", "").css("top", "");
        this.$element.find(".menu-items").css("left", "");
        this.$element.find(".menu-item").css("position", "").css("top", "").css("left", "");
        this.$element.find(".menu-close").css("width", "");
        delete this.options;
        delete this.$element;
    };

    function Plugin(option, args) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('slidemenu');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('slidemenu', (data = new SlideMenu(this, options)));
            if (typeof option == 'string') data[option](args);
        });
    }

    var old = $.fn.slidemenu;

    $.fn.slidemenu = Plugin;
    $.fn.slidemenu.Constructor = SlideMenu;

    // Slidemenu NO CONFLICT
    // ===================	
    $.fn.slidemenu.noConflict = function() {
        $.fn.slidemenu = old;
        return this;
    };

}(jQuery));
