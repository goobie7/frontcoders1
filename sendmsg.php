<?php
if($_POST)
{
    $to_email = "kontakt@ecoders.pl"; //Recipient email, Replace with own email here
    $from_email = "info@ecoders.pl"; //From email address (eg: no-reply@YOUR-DOMAIN.com)
    $your_page = "eCoders.pl"; //Enter your page name or address
    $subject = "wiadomość z formularza eCoders";

    // $send_copy = false; //default: no copy to user

    //check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        $output = json_encode(array( //create JSON data
            'type'=>'error',
            'text' => 'Sorry Request must be Ajax POST'
        ));
        die($output); //exit script outputting json data
    }

    //Sanitize input data using PHP filter_var().
    $user_name      = filter_var($_POST["user_name"], FILTER_SANITIZE_STRING);
    $user_email     = filter_var($_POST["user_email"], FILTER_SANITIZE_EMAIL);
    // $country_code   = filter_var($_POST["country_code"], FILTER_SANITIZE_NUMBER_INT);
    $phone_number   = filter_var($_POST["phone_number"], FILTER_SANITIZE_NUMBER_INT);
    // $subject        = filter_var($_POST["subject"], FILTER_SANITIZE_STRING);
    $message        = filter_var($_POST["msg"], FILTER_SANITIZE_STRING);
    // $send_copy      = filter_var($_POST["sendcopy"], FILTER_SANITIZE_STRING);

    //additional php validation
    if(strlen($user_name)<3){ // If length is less than 4 it will output JSON error.
        $output = json_encode(array('type'=>'error', 'text' => 'Wybacz, ale imię jest za krótkie'));
        die($output);
    }
    if(!filter_var($user_email, FILTER_VALIDATE_EMAIL)){ //email validation
        $output = json_encode(array('type'=>'error', 'text' => 'Wpisz poprawny e-mail'));
        die($output);
    }
    // if(!filter_var($country_code, FILTER_VALIDATE_INT)){ //check for valid numbers in country code field
    //     $output = json_encode(array('type'=>'error', 'text' => 'Enter only digits in country code'));
    //     die($output);
    // }
    if(!filter_var($phone_number, FILTER_SANITIZE_NUMBER_FLOAT)){ //check for valid numbers in phone number field
        $output = json_encode(array('type'=>'error', 'text' => 'Numer telefonu to same cyfry ;) '));
        die($output);
    }
    if(strlen($phone_number)<9){ //check emtpy message
        $output = json_encode(array('type'=>'error', 'text' => 'Hej! czy numer telefonu nie jest za krótki? '));
        die($output);
      }
    // if(strlen($subject)<3){ //check emtpy subject
    //     $output = json_encode(array('type'=>'error', 'text' => 'Subject is required'));
    //     die($output);
    // }
    if(strlen($message)<3){ //check emtpy message
        $output = json_encode(array('type'=>'error', 'text' => 'Wszystko pięknie, ale napisz troszkę więcej :) '));
        die($output);
    }

    //email body
    // $message_body = $message."\n\n".$user_name."\nEmail : ".$user_email."\nPhone Number : (".$country_code.") ". $phone_number ;
    $message_body = $message."\r\n\r\n-----\r\n"."Wiadomość napisana przez: ".$user_name."\r\ne-mail: ".$user_email."\r\ntel.: (".$country_code.") ". $phone_number."\r\nWysłano za pomocą formularza ".$your_page."  \r\n-----" ;

	### Attachment Preparation ###
	$file_attached = false;
	if(isset($_FILES['file_attach'])) //check uploaded file
	{
		//get file details we need
		$file_tmp_name  = $_FILES['file_attach']['tmp_name'];
		$file_name 		  = $_FILES['file_attach']['name'];
		$file_size 		  = $_FILES['file_attach']['size'];
		$file_type 		  = $_FILES['file_attach']['type'];
		$file_error 	  = $_FILES['file_attach']['error'];

		//exit script and output error if we encounter any
		if($file_error>0)
		{
			$mymsg = array(
			1=>"The uploaded file exceeds the upload_max_filesize directive in php.ini",
			2=>"The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form",
			3=>"The uploaded file was only partially uploaded",
			4=>"No file was uploaded",
			6=>"Missing a temporary folder" );

			$output = json_encode(array('type'=>'error', 'text' => $mymsg[$file_error]));
			die($output);
		}

		//read from the uploaded file & base64_encode content for the mail
		$handle = fopen($file_tmp_name, "r");
        $content = fread($handle, $file_size);
        fclose($handle);
		$encoded_content = chunk_split(base64_encode($content));
		//now we know we have the file for attachment, set $file_attached to true
		$file_attached = true;
	}


	if($file_attached) //continue if we have the file
	{
		$boundary = md5("sanwebe");

		//header
		$headers = "MIME-Version: 1.0\r\n";
		$headers .= "From:".$from_email."\r\n";
		$headers .= "Reply-To: ".$user_email."" . "\r\n";
		$headers .= "Content-Type: multipart/mixed; boundary = $boundary\r\n\r\n";

		//plain text
		$body = "--$boundary\r\n";
		$body .= "Content-Type: text/plain;charset=UTF-8\r\n";
		$body .= "Content-Transfer-Encoding: base64\r\n\r\n";
		$body .= chunk_split(base64_encode($message_body));

		//attachment
		$body .= "--$boundary\r\n";
		$body .="Content-Type: $file_type; name=\"$file_name\"\r\n";
		$body .="Content-Disposition: attachment; filename=\"$file_name\"\r\n";
		$body .="Content-Transfer-Encoding: base64\r\n";
		$body .="X-Attachment-Id: ".rand(1000,99999)."\r\n\r\n";
		$body .= $encoded_content;

	}else{
		//proceed with PHP email.
		$headers = "From:".$from_email."\r\n".
		'Reply-To: '.$user_email.'' . "\r\n" .
    "Content-type:text/plain;charset=UTF-8\r\n" .
		'X-Mailer: PHP/' . phpversion();
		$body = $message_body;
	}

	$send_mail = @mail($to_email, $subject, $body, $headers);

  //if attachment do not exist set string none
  if(!$file_name) { $file_name = "none"; }

  // copy of message to sender
  //proceed with PHP email.
  if($send_copy == "copy") {
    $message_body = $message."\r\n\r\n-----\r\nThis is copy of message, which was written by You: \r\n".$user_name."\r\ne-mail: ".$user_email."\r\nPhone Number: (".$country_code.") ". $phone_number."\r\n"."Attachment: ".$file_name."\r\nand sent from ".$your_page." internet website. \r\n-----" ;
    $headers = 'From: '.$from_email.'' . "\r\n" .
    'Reply-To: '.$from_email.'' . "\r\n" .
    'Content-type:text/plain;charset=UTF-8\r\n' .
    'X-Mailer: PHP/' . phpversion();
    $send_copymail = @mail($user_email, $subject, $message_body, $headers);
}


  //finale - repeating to website front


    if(!$send_mail)
    {
        //If mail couldn't be sent output error. Check your PHP email configuration (if it ever happens)
        $output = json_encode(array('type'=>'error', 'text' => 'Błąd serwera - przepraszamy!'));
        die($output);
    }else{
        $output = json_encode(array('type' => 'message', 'text' => 'Cześć ' .$user_name . '. Dziękujemy za wiadomość' ));
        die($output);
    }
}
?>
