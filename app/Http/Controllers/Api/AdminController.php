<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BranchResource;
use App\Http\Resources\GroupResource;
use App\Http\Resources\LevelResource;
use App\Http\Resources\TeacherResource;
use App\Models\Branch;
use App\Models\Group;
use App\Models\Level;
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
        $branches =  BranchResource::collection(Branch::all());
        $levels =   LevelResource::collection(Level::all());
        $groups = GroupResource::collection(Group::all());
        $teachers =  TeacherResource::collection(Teacher::all());
        return response()->json([
            "branches" => $branches,
            "levels" => $levels,
            "teachers" => $teachers,
            "groups" => $groups
        ]);
    }
}
