var popUpModal;
/*
PopUpModal

Show a pop-up modal if there is no cookie called "hasSeenModal".
Bind click events for a 'go away' link and to the 'submit' button
to set the hasSeenModal cookie.

settings:
debug
showOnHomePage

Minimal HTML elements:

Minimal CSS:


 */

$(document).ready( function() {
    popUpModal = new PopUpModal();

    

    popUpModal.show();
});

function PopUpModal() {

    this.debug = false;
    this.showOnHomePage = true;

    this.show = function() {
        // bind 'goAway' function to [X] and submit buttons
        if(!this.readModalCookie()) {
            var filename = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
            var base = filename.split(".");
            var basename = base[0];
            if(this.showOnHomePage || !(basename == "index" || basename == '')) {
                $("#pop-up-modal .go-away").bind({click: function() { popUpModal.goAway();}});
                $("#pop-up-modal input[type=submit]").bind({click: function() { popUpModal.goAway();}});
                $("#pop-up-modal").show();
            } else {
                if(this.debug) {
                    alert("I'd show you the modal, but we're on " + basename + ".");
                }
            }
        }
    };

    /**
     Stop showing the modal
     */
    this.goAway = function() {
        document.cookie = "hasSeenModal=1; path=/";
        $("#pop-up-modal").hide();
        if(this.debug) {
            $("#value").text("hasSeenModal=" + popUpModal.readModalCookie());
        }
    };


    /**
     * Read the cookie
     * @return {*}
     */
    this.readModalCookie = function () {
        var nameEQ = "hasSeenModal=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    };

    /**
     * Debug method for clearing the cookie
     * @param name
     */
    this.clearModalCookie = function (name) {
        document.cookie = "hasSeenModal=; path=/";
        location.reload();
    };
}
