<?php
declare(strict_types=1);

namespace Kokuhaku\Modules\Cli\Tasks;

class MainTask extends \Phalcon\Cli\Task
{
    public function mainAction()
    {
        echo "Congratulations! You are now flying with Phalcon CLI!";
    }
}