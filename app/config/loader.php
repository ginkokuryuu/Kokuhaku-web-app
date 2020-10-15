<?php

use Phalcon\Loader;

$loader = new Loader();

/**
 * Register Namespaces
 */
$loader->registerNamespaces([
    'Kokuhaku\Models' => APP_PATH . '/common/models/',
    'Kokuhaku\Events' => APP_PATH . '/common/events/',
    'Kokuhaku'        => APP_PATH . '/common/library/',
]);

/**
 * Register module classes
 */
$loader->registerClasses([
    'Kokuhaku\Modules\Frontend\Module' => APP_PATH . '/modules/frontend/Module.php',
    'Kokuhaku\Modules\Cli\Module'      => APP_PATH . '/modules/cli/Module.php',
    'Kokuhaku\Modules\BFS\Module'      => APP_PATH . '/modules/bfs/Module.php',
]);

$loader->register();
