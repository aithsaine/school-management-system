<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BranchResource;
use App\Http\Resources\GroupResource;
use App\Http\Resources\LevelResource;
use App\Http\Resources\OptionResource;
use App\Http\Resources\StudentResource;
use App\Http\Resources\TeacherResource;
use App\Models\Branch;
use App\Models\Group;
use App\Models\Level;
use App\Models\Option;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware(["auth:sanctum", "admin"]);
    }
    //
    public function info()
    {
        $branches =  BranchResource::collection(Branch::orderBy("level_id")->get());
        $levels =   LevelResource::collection(Level::all());
        $groups = GroupResource::collection(Group::orderBy("option_id")->get());
       $options = OptionResource::collection(Option::all());
        $students = StudentResource::collection(Student::orderBy("group_id")->get());
        $teachers =  TeacherResource::collection(Teacher::all());
        return response()->json([
            "students" => $students,
            "branches" => $branches,
            "levels" => $levels,
            "teachers" => $teachers,
            "groups" => $groups,
            "options"=>$options
        ]);
    }
}
