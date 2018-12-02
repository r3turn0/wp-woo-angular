<?php
$path = preg_replace('/wp-content(?!.*wp-content).*/','',__DIR__);
include($path.'wp-load.php');
function submitEmail(){
    /*  TEST Only */
    //$to = 'jericta87@gmail.com';
    $to = $_POST['to'];
    $sub = $_POST['subject'];
    $email = $_POST['email'];
    $name = $_POST['first_name'] . " " . $_POST['last_name'];
    $subject = 'SITENAME Contact Form: ' . $sub;
    $msg = $_POST['message']; 
    $headers = "MIME-Version: 1.0 \r\n";
    $headers .= "Content-Type: text/html; charset=utf-8 \r\n";
    $headers .= "Reply-To: " . $email;
    $message = "<html><body>";  
    $message .= "From: " . $name . "<br><br>";
    $message .= "Email: " . $email . "<br><br>";
    $message .= "Phone: " . $_POST['phone'] . "<br><br>";
    $message .= "Message: " . $msg . "<br><br></body></html>";
    if(wp_mail($to, $subject, $message, $headers)){
        echo json_encode(array('status' => 200));
        submitReply($to, $name, $email, $sub, $msg);
    }
    else{
        echo json_encode(array('status' => -1));
    }      
}
function submitReply($from, $name, $email, $sub, $msg) {
    /*  TEST Only */
    //$to = 'jericta87@gmail.com';
    $subject = 'SITENAME Contact Form (Automated Response): ' . $sub;
    $headers = "MIME-Version: 1.0 \r\n";
    $headers .= "Content-Type: text/html; charset=utf-8 \r\n";
    $headers .= "Reply-To: " . $from;
    $message = "<html><body>";
    $message .= "Greetings " . $name . ", <br><br>";
    $message .= "Thank you for reaching out to SITENAME! <br><br>";
    $message .= "Your message: " . $msg . "<br><br>";
    $message .= "We will try to respond back to you as fast as possible. <br>";
    $message .= "Please look for a response within 24-48 hours. <br><br>";
    $message .= "- SITENAME Customer Service<br><br>";
    $message .= "</body></html>";
    wp_mail($email, $subject, $message, $headers);
}
if(isset($_POST['submit'])){
    submitEmail();
}
?>