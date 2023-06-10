<?php

namespace App\Http\Controllers\Api\Teacher;
use Maatwebsite\Excel\Excel as ExcelExcel;
use App\Models\Affectation;
use Illuminate\Http\Request;
use App\Exports\NoteGridExport;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;

class TeacherNoteController extends Controller
{
    //

    function grille($id,$nbr){
        $aff = Affectation::find($id);
        return Excel::download(new NoteGridExport($id,$nbr), "module ".$aff->module->title.' '."controle numero $nbr "."group {$aff->group->option->branch->key}-{$aff->group->name}".".xlsx",ExcelExcel::XLSX);
    }
}
