<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Group;
use App\Models\Student;
use App\Rules\UniqueGroup;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\GroupResource;
use App\Http\Resources\StudentResource;

class AdminGroupsController extends Controller
{
    //
    public function store(Request $request)
    {
        $request->validate([
            "branch"=>["required","exists:branches,id"],
            "name"=>["required",new UniqueGroup($request->branch??-1)]
        ]);

        Group::create([
            "branch_id"=>$request->branch,
            "name"=>$request->name
        ]);

        return response(["status" => 200, "groups" => GroupResource::collection(Group::orderBy("branch_id")->get()), "message" => "la group est ajouter avec success"]);

    }
    public function delete($id)
    {
        Group::find($id)->delete();
        return response(["status" => 200, "branches" => GroupResource::collection(Group::orderBy("branch_id")->get()), "students" => StudentResource::collection(Student::all()), "message" => "le groupe est supprimé avec success"]);
    }
}
