<?php

namespace App\Http\Controllers\Api\Teacher;

use Maatwebsite\Excel\Excel as ExcelExcel;
use App\Models\Affectation;
use Illuminate\Http\Request;
use App\Exports\NoteGridExport;
use App\Http\Controllers\Controller;
use App\Http\Resources\AffectationResource;
use App\Models\Note;
use App\Models\Student;
use Maatwebsite\Excel\Facades\Excel;

class TeacherNoteController extends Controller
{
    //

    function grille($id, $nbr)
    {
        $aff = Affectation::find($id);
        return Excel::download(new NoteGridExport($id, $nbr), "module " . $aff->module->title . ' ' . "controle numero $nbr " . "group {$aff->group->option->branch->key}-{$aff->group->name}" . ".xlsx", ExcelExcel::XLSX);
    }
    function store(Request $request)
    {
        $request->validate([
            "assignement" => "required|exists:affectations,id"
        ]);
        $assignement = Affectation::find($request->assignement);
        if ($assignement->status =="not started")
        {
            return response()->json(["message" => "ce module pas en cours commances"], 401);

        }
        if ($assignement->status =="finished")
        {
            return response()->json(["message" => "ce module est terminer"], 401);

        }
        foreach ($request->notes as $note) {
            if ($note[1] < 0 || $note[1] > 20 || $note[1]=="") {
                return response()->json(["message" => "la note doit etre supperieur ou egal 0 ou inferieur ou egal 20"], 401);
            }
        }
        foreach ($request->notes as $note) {
            $student = Student::where("student_number", $note[0])->first();
            Note::create([
                "student_id" => $student->id,
                "affectation_id" => $assignement->id,
                "note" =>(float) $note[1],
                "control_number"=>$request->control_number
            ]);
        }
        return response()->json(["message" =>"les note est ajoute avec success","assignements"=>AffectationResource::collection(Affectation::where("teacher_id",$assignement->teacher_id)->get())]);
    }
}
