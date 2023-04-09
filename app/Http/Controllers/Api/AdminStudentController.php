<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;

class AdminStudentController extends Controller
{
    //
    public function index(Request $request)
    {
        $students = Student::all();
        return response()->json(["students" => $students]);
    }
}
