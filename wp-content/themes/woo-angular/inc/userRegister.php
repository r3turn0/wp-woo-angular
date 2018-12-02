<?php
$path = preg_replace('/wp-content(?!.*wp-content).*/','',__DIR__);
include($path.'wp-load.php');
function submitEmail(){
    /*  TEST Only */
    //$to = 'jericta87@gmail.com';
    $to = $_POST['to'];
    $subject = 'SITENAME Customer Registration Confirmation';
    $headers = "MIME-Version: 1.0 \r\n";
    $headers .= "Content-Type: text/html; charset=utf-8 \r\n";
    $headers .= "Reply-To: " . $_POST['email'];
    $message = "<html><body>";  
    $message .= "Thank you for registering with SITENAME! Your account has been created. <br><br>";
    $message .= "Email: " . $_POST['email'] . "<br><br>";
    $message .= "Password: " . $_POST['password'] . "<br><br>";
    $message .= "Please click on the link below to finish registering your account. <br><br>";
    $message .= "<a href='https:".$_POST['link']."' title='SITENAME | Complete User Registration'>Complete Registration</a> <br><br>";
    if(wp_mail($to, $subject, $message, $headers)){
        echo json_encode(array('status' => 200));
    }
    else{
        echo json_encode(array('status' => -1));
    }      
}
if(isset($_POST['submit'])){
    submitEmail();
}
?>