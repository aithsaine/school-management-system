<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Group;
use App\Models\Level;
use App\Models\Branch;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\GroupResource;
use App\Http\Resources\LevelResource;
use App\Http\Resources\BranchResource;
use App\Http\Resources\StudentResource;
use App\Http\Resources\TeacherResource;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AdminStudentController extends Controller
{
    public function __construct()
    {
        $this->middleware(["auth:sanctum", "admin"]);
    }
    //
    public function info()
    {
        $students = StudentResource::collection(Student::orderBy("group_id")->get());
        $branches =  BranchResource::collection(Branch::all());
        $levels =   LevelResource::collection(Level::all());
        $groups = GroupResource::collection(Group::all());
        $teachers =  TeacherResource::collection(Teacher::all());
        return response()->json([
            "students" => $students,
            "branches" => $branches,
            "levels" => $levels,
            "teachers" => $teachers,
            "groups" => $groups
        ]);
    }

    public function store(Request $request)
    {
        try {

            Student::validate($request);
        } catch (ValidationException $er) {
            return response($er->errors(), 422);
        }

        $cleanFname = implode('', explode(" ", trim($request->first_name)));
        $cleanLname = implode('', explode(" ", trim($request->last_name)));
        $user = new User();
        $user->cin = $request->cin;
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $cleanFname . "." . $cleanLname . "@ofppt-edu.ma";
        $user->password = Hash::make("P@ssw0rd");
        $user->gender = $request->gender;
        $user->birthday = $request->birthday;
        $user->adress = $request->adress;
        $user->tele = $request->tele;
        $user->save();
        $student = new Student();
        $student->student_number = uniqid(Branch::find($request->branch)->key . '-');
        $student->user_id = $user->id;
        $student->group_id = $request->group;
        $student->registration_date = Carbon::today();
        $student->save();
        return response(["status" => 200, "message" => "le stagiaire est ajouter avec success"]);
    }
    public function filtreStudents(Request $request)

    {
        $name = $request->query("name");
        $level = $request->query("level");
        $branch = $request->query("branch");
        $res = [];
        $students = DB::table('students')
            ->leftJoin('groups', "students.group_id", '=', "groups.id")
            ->leftJoin('users', "students.user_id", "=", "users.id")
            ->leftJoin("branches", "groups.branch_id", "=", "branches.id")
            ->leftJoin("levels", "branches.level_id", "=", "levels.id")
            ->select("students.student_number as std_nbr");
        if ($name !== null) {
            $students = $students->whereRaw("concat(users.first_name,' ',users.last_name) like '%$name%'");
        }
        if ($level !== null) {
            $students = $students->where("levels.id",  $level);
        }
        if ($branch !== null) {
            $students = $students->where("branches.id", $branch);
        }


        foreach ($students->get() as $item) {
            $res[] = (Student::where("student_number", $item->std_nbr)->get())[0];
        }



        return response()->json(["students" => StudentResource::collection($res)]);
    }
}
