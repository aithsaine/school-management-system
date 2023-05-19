<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Option;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ModuleResource;
use App\Models\Module;

class AdminModuleController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware(["auth:sanctum", "admin"]);
    }
    public function store(Request $request)
    {
        $request->validate(
            [
            "branch"=>["required","exists:branches,id"],
            "option"=>["required",$request->option!=-1? "exists:options,id":""],
            "title"=>['required',"regex:/[a-zA-Z]/"],
            "key"=>["required"],
            "duration"=>["required","regex:/[0-9]/"],
            "coefficient"=>["required","regex:/[0-9]/"]
            ]
            );
            $id = $request->option;
            if($request->season ==1)
            {
              $id =  Option::where("branch_id",$request->branch)->where("key","TC")->first()->id;
            }
            Module::create([
                "option_id"=>$id,
                "title"=>$request->title,
                "key"=>$request->key,
                "duration"=>$request->duration,
                "coefficient"=>$request->coefficient
            ]);
            return response()->json(["message"=>"le module est ajoute avec success", "modules"=>ModuleResource::collection(Module::all())]);

    }
    public function delete($id)
    {
        Module::find($id)->delete();
        return response(["status" => 200, "modules" => ModuleResource::collection(Module::all()),  "message" => "la branche est supprimé avec success"]);

    }

}
