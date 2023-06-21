<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminAbsencesController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware(["auth:sanctum", "admin"]);
    }
}
