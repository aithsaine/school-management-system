<?php

namespace App\Http\Controllers\Api\Student;

use App\Http\Controllers\Controller;
use App\Http\Resources\AffectationResource;
use App\Http\Resources\ModuleResource;
use App\Http\Resources\NoteResource;
use App\Http\Resources\StudentResource;
use App\Models\Affectation;
use App\Models\Note;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware(["auth:sanctum","student"]);
    }
   
    public function info($id)
    {
        $student = Student::where("user_id",$id)->first();
        $assignements = AffectationResource::collection(Affectation::where("group_id",$student->group->id)->get());
        $notes = NoteResource::collection($student->notes);
        $modules = ModuleResource::collection($student->group->option->modules);
        return response()->json([
            "assignements"=>$assignements,
            "notes"=>$notes,
            "modules"=>$modules,
            "student"=>new StudentResource($student)
        ]);
    }
}
