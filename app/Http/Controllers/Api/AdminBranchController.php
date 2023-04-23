<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BranchResource;
use App\Http\Resources\StudentResource;
use App\Models\Branch;
use App\Models\Student;
use Illuminate\Http\Request;

class AdminBranchController extends Controller
{
    public function __construct()
    {
        $this->middleware(["auth:sanctum", "admin"]);
    }
    public function index()
    {
        $students = BranchResource::collection(Branch::all());
        return response()->json([
            "branches" => $students,
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            "level" => ["required", "exists:levels,id"],
            "name" => ["required", "unique:branches,name"],
            "key" => ["required", "unique:branches,key"]
        ]);
        Branch::create([
            "level_id" => $request->level,
            "name" => $request->name,
            "key" => $request->key
        ]);
        return response(["status" => 200, "branches" => BranchResource::collection(Branch::all()), "message" => "la branche est ajouter avec success"]);
    }
    public function delete($id)
    {
        Branch::find($id)->delete();
        return response(["status" => 200, "branches" => BranchResource::collection(Branch::all()), "students" => StudentResource::collection(Student::all()), "message" => "la branche est supprimé avec success"]);
    }
}
