<?php
    $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptcha_secret = '6LdHSvgcAAAAAKG5pFRo3-y6n296zAcnozJDpLlx';
    $recaptcha_response = $_POST['recaptcha_response'];

    $recaptcha = file_get_contents($recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);

    $recaptchaJSON = json_decode($recaptcha);
    if ($recaptchaJSON->success == true && $recaptchaJSON->score >= 0.5) {
        echo '{"status":true, "message":"Спасибо за ваше обращение, наш менеджер вскоре свяжется с вами!"}';
    } else {
        echo '{"status":false, "message":"Не пройдена проверка на робота"}';
    }
?>