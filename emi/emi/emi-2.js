jQuery(document).ready(function () {
    jQuery("ul.posts-nav li").click(function () {
        if (jQuery(this).attr("class") != "active") {
            jQuery(this).addClass("active").siblings().removeClass("active");
            var poststag = jQuery(this).attr("id");
            if (poststag == "nav-home-loan") {
                jQuery("#posts-personal-loan").removeClass("show_element").addClass("hide_element");
                jQuery("#posts-car-loan").removeClass("show_element").addClass("hide_element");
                jQuery("#posts-general").removeClass("show_element").addClass("hide_element");
                jQuery("#posts-home-loan").removeClass("hide_element").addClass("show_element");
            } else if (poststag == "nav-personal-loan") {
                jQuery("#posts-car-loan").removeClass("show_element").addClass("hide_element");
                jQuery("#posts-general").removeClass("show_element").addClass("hide_element");
                jQuery("#posts-home-loan").removeClass("show_element").addClass("hide_element");
                jQuery("#posts-personal-loan").removeClass("hide_element").addClass("show_element");
            } else if (poststag == "nav-car-loan") {
                jQuery("#posts-personal-loan").removeClass("show_element").addClass("hide_element");
                jQuery("#posts-general").removeClass("show_element").addClass("hide_element");
                jQuery("#posts-home-loan").removeClass("show_element").addClass("hide_element");
                jQuery("#posts-car-loan").removeClass("hide_element").addClass("show_element");
            } else if (poststag == "nav-general") {
                jQuery("#posts-car-loan").removeClass("show_element").addClass("hide_element");
                jQuery("#posts-personal-loan").removeClass("show_element").addClass("hide_element");
                jQuery("#posts-home-loan").removeClass("show_element").addClass("hide_element");
                jQuery("#posts-general").removeClass("hide_element").addClass("show_element");
            }
        }
        return false;
    });
});