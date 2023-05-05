<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Group;
use App\Models\Student;
use App\Rules\UniqueGroup;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\GroupResource;
use App\Http\Resources\StudentResource;
use App\Models\Option;

class AdminGroupsController extends Controller
{
    //
    public function store(Request $request)
    {
        $request->validate([
            "branch"=>["required","exists:branches,id"],
            "season"=>["required"],
            "option"=>["required",$request->option!=-1? "exists:options,id":""],
            "name"=>["required", new UniqueGroup($request->option,$request->branch)]
        ]);
        $id = $request->option;
        if($request->season ==1)
        {
          $id =  Option::where("branch_id",$request->branch)->where("key","TC")->first()->id;
        }
        Group::create(
            [

            "option_id"=>$id,
            "name"=>$request->name
        ]);

        return response(["status" => 200, "groups" => GroupResource::collection(Group::orderBy("option_id")->get()), "message" => "la group est ajouter avec success"]);

    }
    public function delete($id)
    {
        Group::find($id)->delete();
        return response(["status" => 200, "groups" => GroupResource::collection(Group::orderBy("option_id")->get()), "students" => StudentResource::collection(Student::all()), "message" => "le groupe est supprimé avec success"]);
    }
}
