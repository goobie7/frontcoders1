$(document).ready(function() {

    $("#submit_btn").click(function() {

	    var proceed = true;
        //simple validation at client's end
        //loop through each field and we simply change border color to red for invalid fields
		$("#contact_form input[required=true], #contact_form textarea[required=true]").each(function(){
			$(this).css('border-color','');
			if(!$.trim($(this).val())){ //if this field is empty
				$(this).css('border-color','red'); //change border color to red
				proceed = false; //set do not proceed flag
			}
			//check invalid email
			var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
				$(this).css('border-color','red'); //change border color to red
				proceed = false; //set do not proceed flag
			}
		});

        if(proceed) //everything looks good! proceed...
        {

          // show work indicator
          $("#msg_loader").append( "<img src=\"loader.gif\">");

          // different values for sendcopy checkbox - because val always take the same value
          // if(! $("#sendcopy").is(':checked')) { var sendcopy = "nocopy"; console.log("pole niezaznaczone"); }
          // else { var sendcopy = "copy"; console.log("pole zaznaczone"); }

           //data to be sent to server
            var m_data = new FormData();
            m_data.append( 'user_name', $('input[name=contact-name]').val());
            m_data.append( 'user_email', $('input[name=contact-email]').val());
            // m_data.append( 'country_code', $('input[name=phone1]').val());
            m_data.append( 'phone_number', $('input[name=contact-phone]').val());
            // m_data.append( 'subject', $('select[name=subject]').val());
			      m_data.append( 'msg', $('textarea[name=contact-message]').val());
			      // m_data.append( 'file_attach', $('input[name=file_attach]')[0].files[0]);
            // m_data.append( 'sendcopy', sendcopy );

            //instead of $.post() we are using $.ajax()
            //that's because $.ajax() has more options and flexibly.
  			$.ajax({
              url: 'sendmsg.php',
              data: m_data,
              processData: false,
              contentType: false,
              type: 'POST',
              dataType:'json',
              success: function(response){
                 //load json data from server and output message
         				if(response.type == 'error'){ //load json data from server and output message
        					output = '<div class="error">'+response.text+'</div>';
        				} else {
        				  output = '<div class="success">'+response.text+'</div>';
                  //resetujemy wszystkie wartości
                  $('.formReset').val('');
        				}

                $("#contact_form #contact_results").hide().html(output).slideDown();



                //hide work indicator
                $("#msg_loader img").fadeOut(500);
                // $('#contact_form input').val('');
                // $('#contact_form textarea').val('');
              }
            });


        }
    });

    //reset previously set border colors and hide all message on .keyup()
    $("#contact_form  input[required=true], #contact_form textarea[required=true]").keyup(function() {
        $(this).css('border-color','');
        $("#result").slideUp();
    });
});
