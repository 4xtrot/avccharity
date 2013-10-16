<?php
/**
 * Created by JetBrains PhpStorm.
 * User: 4xtrot
 * Date: 16.10.13
 * Time: 13:06
 * To change this template use File | Settings | File Templates.
 */

function rand_photo($patch /* = "."*//*, $w ="100"*/)
{
    //$patch - путь к каталогу.
    // Пример: (http:??lphp.ru/images/Avatar1/)
    // или относительный путь: (images/Avatar1/)
    // По умолчанию функция будет обрабатывать текущий каталог

    //Открываем каталог
    if(!$dir = opendir($patch)) return "It't catalog";
    // Читаем содержимое каталога
    while(($t = readdir($dir)) !== false)
    {
        $ext = substr(strrchr($t,'.'), 1);
        if(is_file($t) && ($ext == "gif") || ($ext == "jpg") || ($ext == "png"))
        {
            $filename[] = /*$patch."/".*/ $t;
        }
    }


    // Закрываем каталог
    closedir($dir);



    // Получаем случайный индекс из массива
    $index = rand(0, count($filename) - 1);
    // Выводим случайный файл
    $foto = /*'<img src="'.*/ $filename[$index] /*.'" width="'.$w.'">'*/;

    return $foto; // функция возвращает случайное фото
}


?>