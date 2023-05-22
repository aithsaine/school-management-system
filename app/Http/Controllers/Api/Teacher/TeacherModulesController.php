<?php

namespace App\Http\Controllers\Api\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Resources\AffectationResource;
use App\Models\Affectation;
use Illuminate\Http\Request;

class TeacherModulesController extends Controller
{
    //

    public function start_module(Request $request){
        $request->validate([
            "group"=>"required|exists:groups,id",
            "id_assignement"=>"exists:affectations,id",
            "teacher"=>"exists:teachers,id",
        ]);
        if(Affectation::where("teacher_id",$request->teacher)->where("group_id",$request->group)->where("status","started")->exists()){
        return response()->json(["message"=>"terminer le module qui est déja lanceé apres lances un autre"],401);
        }else{

            $affectation = Affectation::find($request->id_assignement);
            $affectation->status = "started";
        $affectation->save();
        return response()->json(["message"=>"le module a démarré avec succès","assignements"=>AffectationResource::collection(Affectation::where("teacher_id",$request->teacher)->get())]);
    }
    }
    public function end_module(Request $request){
        $request->validate([
            "id_assignement"=>"exists:affectations,id",
            "teacher"=>"exists:teachers,id"
        ]);
        $affectation = Affectation::find($request->id_assignement);
        $affectation->status = "finished";
        $affectation->save();
        return response()->json(["message"=>"le module a terminer avec succès","assignements"=>AffectationResource::collection(Affectation::where("teacher_id",$request->teacher)->get())]);
    }
}
