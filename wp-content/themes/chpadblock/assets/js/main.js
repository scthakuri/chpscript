(function($){
   
    /****************************************
    Buy Now Button on Product Page
    *****************************************/
    jQuery(document).on('click', '.adblock_buy_button', function(){
        var $thisbutton = jQuery(this);
        var variationID = $thisbutton.attr('data-id');
        var previous_html = $thisbutton.html();
        
        if(variationID.length > 0){
            var data = {
                action: 'woocommerce_ajax_add_to_cart',
                variation_id: variationID
            };
            
            jQuery.ajax({
                type: 'post',
                url: chpadblock.ajaxurl,
                data: data,
                beforeSend: function (response) {
                    $thisbutton.attr('disabled', true);
                    $thisbutton.html('<i class="la la-spinner la-spin"></i> Please Wait...');
                },
                complete: function (response) {
                    $thisbutton.attr('disabled', false);
                    $thisbutton.html(previous_html);
                },
                success: function (response) {
                    if (response.error && response.product_url) {
                        // window.location = response.product_url;
                        return;
                    }
                    window.location.href = window.location.origin + '/checkout';
                    
                },
            });
        }
    });
    
    jQuery(document).on('click', '.codehelppro_custom_accordion_header', function(){
        jQuery(document).find('.codehelppro_custom_accordion_content').slideUp('slow');
        jQuery(document).find('.codehelppro_custom_accordion_header').removeClass('opened').addClass('closed');
        var header = jQuery(this);
        var ele = header.parent();
        var content = ele.find('.codehelppro_custom_accordion_content');
        if(content.is(':visible')){
            content.slideUp('slow');
            header.removeClass('opened').addClass('closed');
        }else{
            content.slideDown('slow');
            header.removeClass('closed').addClass('opened');
        }
    });
    
    
    /* ============================== typing animation ============================ */
    if( jQuery(document).find(".typeing").length > 0 ){
        new Typed(".typeing",{
            strings:["", "#1 Adblock Detector Wordpress Plugin", "Stop ad blocking on your site now","Ad-blocking has gone exponential","Publishers are losing billions"],
            typeSpeed:100,
            BackSpeed:150,
            loop:true
        })   
    }
    
    if( jQuery(document).find("#editor").length > 0 ){
        
    }
    
    function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }
    
    if( jQuery(document).find("#reportrange").length > 0 ){
        const start = moment().subtract(6, 'days');
        const end = moment();
        
        $('#reportrange').daterangepicker({
            startDate: start,
            endDate: end,
            maxDate: end,
            ranges: {
               'Today': [moment(), moment()],
               'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
               'Last 7 Days': [moment().subtract(6, 'days'), moment()],
               'Last 30 Days': [moment().subtract(29, 'days'), moment()],
               'This Month': [moment().startOf('month'), moment().endOf('month')],
               'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, cb);
        
        cb(start, end);
    }
  
  	jQuery(document).on('change', 'select[name=natureofquery]', function(){
    	if($(this).val() == 'support'){
        	jQuery(document).find('.support_container').fadeIn();
          	jQuery(document).find('.others_container').hide();
        }else{
        	jQuery(document).find('.support_container').hide();
          	jQuery(document).find('.others_container').fadeIn();
        }
    });
  
  	function extraSpace(string){
      	if(string.length > 0)
    		return string.replace(/\s+/g,' ').trim();
     	return string;
    }
  
  	let slideIndex = 0;
  	function moveSlider(e){
      	const reviewlength = jQuery(document).find('.reviews .review').length;
        if(e.currentTarget.id.includes('right')){
          if( slideIndex >= reviewlength - 1 ){
          		slideIndex = 0
          }else{
          	slideIndex++;
          }
        } else {
          if( slideIndex <= 0 ){
          	slideIndex = reviewlength - 1;
          }else{
          	slideIndex--;
          }
        }
        document.querySelector('.reviews').style.transform = `translate(${-100 * slideIndex}%)`;
   	}
  
  	jQuery(document).on('click', '#arrow--right, #arrow--left', moveSlider);
  
  	jQuery(document).on('click', '.submit_message_btn', function(e){
    	e.preventDefault();
      
      	const $this = jQuery(this);
      	const alert = jQuery(document).find('.contact_response_error');
      	alert.hide();
      
      	const fullname = jQuery(document).find('input[name=fullname]').val();
      	const email = jQuery(document).find('input[name=email]').val();
      	const subject = jQuery(document).find('input[name=subject]').val();
      	const message = jQuery(document).find('textarea[name=message]').val();
      	const querytype = jQuery(document).find('select[name=natureofquery] option:selected').val();
      
      	if(extraSpace(fullname.length) <= 0){
          	alert.html("Full name is required!!!").addClass('alert-danger').removeClass('alert-success').show();
          	jQuery('html, body').animate({
                scrollTop: alert.offset().top - 30
            }, 500);
        	return false;
        }
      
      	if(extraSpace(email.length) <= 0){
          	alert.html("Email is required!!!").addClass('alert-danger').removeClass('alert-success').show();
          	jQuery('html, body').animate({
                scrollTop: alert.offset().top - 30
            }, 500);
        	return false;
        }
      
      	if(extraSpace(subject.length) <= 0){
          	alert.html("Query Subject is required!!!").addClass('alert-danger').removeClass('alert-success').show();
          	jQuery('html, body').animate({
                scrollTop: alert.offset().top - 30
            }, 500);
        	return false;
        }
      
      	if(extraSpace(message.length) <= 0){
          	alert.html("Query Message is required!!!").addClass('alert-danger').removeClass('alert-success').show();
          	jQuery('html, body').animate({
                scrollTop: alert.offset().top - 30
            }, 500);
        	return false;
        }
      
      	$this.html("Submitting . . .").attr("disabled", true);
      	grecaptcha.ready(function() {
          grecaptcha.execute('6Lf3kxMhAAAAABW09udtn4-sXBheBtTUkQtGWsxO', {action: 'submit'}).then(function(token) {            
            	$.ajax({
                    method: 'POST',
                    url: chpadblock.ajaxurl,
                  	crossDomain: true,
                    data: {
                      	fullname : fullname,
                      	email : email,
                      	subject : subject,
                      	message : message,
                      	token : token,
                      	querytype : querytype,
                      	action : "submit_contact_response"
                    },
                    success: function(res) {
						if(res.success){
                          	jQuery(document).find('input[name=fullname]').val('');
                            jQuery(document).find('input[name=email]').val('');
                            jQuery(document).find('input[name=subject]').val('');
                            jQuery(document).find('textarea[name=message]').val('');
                        	alert.html(res.message).addClass('alert-success').removeClass('alert-danger').show();
                        }else{
                          	alert.html(res.message).addClass('alert-danger').removeClass('alert-success').show();
                        }
                      	jQuery('html, body').animate({
                            scrollTop: alert.offset().top - 30
                        }, 500);
                      	$this.html("Send Message").attr("disabled", false);
                    },
                    error:function(error) {
                        alert.html("Something Went wrong while contacting to admin!!!").addClass('alert-danger').removeClass('alert-success').show();
                      	jQuery('html, body').animate({
                            scrollTop: alert.offset().top - 30
                        }, 500);
                      	$this.html("Send Message").attr("disabled", false);
                    }
                });
          });
        });
    })
  
  	$('[title]').jBox('Tooltip', {
      	theme: 'TooltipDark',
      	width: 280
    });
  
  	$(document).on('click', '.scripttextareabtn', function(){
    	const textarea = $(document).find('.scripttextarea');
        let $temp = $("<textarea>");
        $("body").append($temp);
        $temp.val(textarea.text()).select();
    	document.execCommand("copy");
      	new jBox('Notice', {
            content: 'Script Copied Successfully!!!',
            color: 'green'
      	});
      	$temp.remove();
    });
  
  	$(document).on("click", ".copy_license_code", function(){
    	const code = $(this).find('code').text().trim();
      	let $temp = $("<input>");
        $("body").append($temp);
        $temp.val(code).select();
        document.execCommand("copy");
      	new jBox('Notice', {
            content: 'License Copied Successfully!!!',
            color: 'green'
      	});
        $temp.remove();
    });

    const upblockModal = $(document).find("#upblockModal");
    if( upblockModal.length > 0 ){
        $(document).find("#upblockModal").modal("show");
    }
})(jQuery);