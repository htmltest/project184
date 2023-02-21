<?php
    $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptcha_secret = '6LdHSvgcAAAAAKG5pFRo3-y6n296zAcnozJDpLlx';
    $recaptcha_response = $_POST['recaptcha_response'];

    $recaptcha = file_get_contents($recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);

    $recaptchaJSON = json_decode($recaptcha);
    if ($recaptchaJSON->success == true && $recaptchaJSON->score >= 0.5) {
        echo '<div class="window-callback"><div class="window-title">Спасибо за обращение!</div><div class="window-success-text">Наш менеджер свяжется с вами в указанное время.</div><div class="window-success-btn"><a href="#" class="btn window-close-btn">Закрыть</a></div></div>';
    } else {
        echo '<div class="window-callback"><div class="window-title">Ошибка!</div><div class="window-success-text">Не пройдена проверка на робота</div><div class="window-success-btn"><a href="#" class="btn window-close-btn">Закрыть</a></div></div>';
    }
?>