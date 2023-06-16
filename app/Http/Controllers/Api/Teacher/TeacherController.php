<?php

namespace App\Http\Controllers\Api\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Resources\AffectationResource;
use App\Http\Resources\BranchResource;
use App\Http\Resources\GroupResource;
use App\Http\Resources\LevelResource;
use App\Http\Resources\ModuleResource;
use App\Http\Resources\NoteResource;
use App\Http\Resources\OptionResource;
use App\Http\Resources\StudentResource;
use App\Models\Affectation;
use App\Models\Branch;
use App\Models\Group;
use App\Models\Level;
use App\Models\Module;
use App\Models\Option;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Support\Facades\DB;

class TeacherController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware(["auth:sanctum","teacher"]);
    }
    public function info($id)
    {
        $branches = BranchResource::collection(Branch::all());
        $groups = GroupResource::collection(Group::all());
        $options = OptionResource::collection(Option::all());
        $modules = ModuleResource::collection(Module::all());
        $students = StudentResource::collection(Student::all());
        $levels = LevelResource::collection(Level::all());
        $teacher = Teacher::where("user_id",$id)->first();
        $assignements = AffectationResource::collection(Affectation::where("teacher_id",$teacher->id)->get());
       $notes = NoteResource::collection( DB::table("notes")->leftJoin("affectations","notes.affectation_id","=","affectations.id")->leftJoin("teachers","affectations.teacher_id","=","teachers.id")->where("affectations.teacher_id",$teacher->id)->select("notes.affectation_id","notes.student_id","notes.note","notes.control_number")->get());
        return response()->json([
            "students" => $students,
            "branches" => $branches,
            "levels" => $levels,
            "teacher"=>$teacher,
            "groups" => $groups,
            "options"=>$options,
            "modules"=>$modules,
            "assignements"=>$assignements,
            "notes"=>$notes
        ]);
    }
}
