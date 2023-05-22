<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AffectationResource;
use App\Rules\ExistModulesRule;
use Illuminate\Http\Request;
use App\Models\Affectation;
use App\Rules\UniqueModuleGroupRule;

class AdminAffectationController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware(["auth:sanctum", "admin"]);
    }
    public function store(Request $request)
    {
        $request->validate([
            "teacher"=>["required","exists:teachers,id"],
            "group"=>["required"],
            "module"=>["required",$request->group?new ExistModulesRule($request->group):"",new UniqueModuleGroupRule($request->group,$request->teacher)],
        ]);

        foreach ($request->module as $item)
        {
            Affectation::create([
                "teacher_id"=>$request->teacher,
                "group_id"=>$request->group,
                "module_id"=>$item,
                "status"=>"not started"
            ]);
        }
        return response(["status" => 200, "assignements" => AffectationResource::collection(Affectation::orderBy("group_id")->get()), "message" => "l'affectation est ajouter avec success"]);

    }

    public function update(Request $request)
    {
        $request->validate([
            "assign"=>["required","exists:affectations,id"],
            "teacher"=>["required","exists:teachers,id"]
        ]);
        if(Affectation::find($request->assign)->status !="not started"){
            return response(["message" => "impossible de changer le formateur parceque le module déja lancés!"],401);
        }
        else{

            $affectaion = Affectation::find($request->assign);
            $affectaion->teacher_id=$request->teacher;
            $affectaion->save();
            return response(["status" => 200, "assignements" => AffectationResource::collection(Affectation::orderBy("group_id")->get()), "message" => "Le nom du formateur a été mis à jour avec succès"]);
        }
    
    }
    public function delete(Request $request)
    {
        $request->validate([
            "assign"=>["required","exists:affectations,id"],
        ]);
        if(Affectation::find($request->assign)->status !="not started"){
            return response(["message" => "impossible de supprimer cette affectation parceque le module déja lancés!"],401);
        }
        else{
            Affectation::destroy($request->assign);
            return response(["status" => 200, "assignements" => AffectationResource::collection(Affectation::orderBy("group_id")->get()), "message" => "L'affectation' a été supprimé avec succès"]);
        }

    }
}
