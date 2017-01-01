$(document).ready(function() {
	$('#contact-form').submit(function() {
		
		var buttonCopy = $('#contact-form button').html(),
			errorMessage = $('#contact-form button').data('error-message'),
			sendingMessage = $('#contact-form button').data('sending-message'),
			okMessage = $('#contact-form button').data('ok-message'),
			invalidEmail = $('#contact-form button').data('error-email-invalid'),
			invalidPhone = $('#contact-form button').data('error-phone-invalid'),
			hasError = false;
		
		$('#contact-form .error-message').remove();
		
		$('.requiredField').each(function() {
			if($.trim($(this).val()) == '') {
				var errorText = $(this).data('error-empty');
				$(this).parent().append('<span class="error-message">'+errorText+'</span>');
				$(this).addClass('inputError');
				hasError = true;
			} else if($(this).is("input[type='email']") || $(this).attr('name')==='contactMail') {
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				if(!emailReg.test($.trim($(this).val()))) {
					$(this).parent().append('<span class="error-message">'+invalidEmail+'</span>');
					$(this).addClass('inputError');
					hasError = true;
				}
			} else if($(this).is("input[type='phone']") || $(this).attr('name')==='contactPhone') {
				var phoneReg = /(([0-9]{2})[-. ]?){5}/;
				if(!phoneReg.test($.trim($(this).val()))) {
					$(this).parent().append('<span class="error-message">'+invalidPhone+'</span>');
					$(this).addClass('inputError');
					hasError = true;
				}
			}
		});
		
		if(hasError) {
			$('#contact-form button').html('<i class="icon-remove"></i>'+errorMessage);
			setTimeout(function(){
				$('#contact-form button').html(buttonCopy);
			},10000);
		}
		else {
			$('#contact-form button').html('<i class="icon-refresh icon-spin"></i>'+sendingMessage);

			var formInput = $(this).serialize();
			$.post($(this).attr('action'),formInput, function(data){
				$('#contact-form button').html('<i class="icon-ok"></i>'+okMessage);
				$('#contact-form button').attr("disabled","disabled");
			});
			setTimeout(function(){
				$('html, body').animate({scrollTop:$('#contact').position().top}, 'slow');
				$('#slideup-group').slideUp(2000);
			}, 5000);
		}
		
		return false;	
	});
});