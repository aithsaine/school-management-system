<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\StudentResource;
use App\Models\Branch;
use App\Models\Level;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;

class AdminStudentController extends Controller
{
    public function __construct()
    {
        $this->middleware(["auth:sanctum", "admin"]);
    }
    //
    public function info(Request $request)
    {
        $students = StudentResource::collection(Student::all());
        $branches = Branch::all();
        $levels = Level::all();
        $teachers = Teacher::all();
        return response()->json([
            "students" => $students,
            "branches" => $branches,
            "levels" => $levels,
            "teachers" => $teachers
        ]);
    }
}
