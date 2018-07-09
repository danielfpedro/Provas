<?php

namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;

class EditorController extends AppController
{

    public function Editor()
    {
        $this->viewBuilder()->layout('editor');
    }
}
