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
        $filename = $aff->module->title . ' ' . "controle $nbr" . ".xlsx";
        return Excel::download(
            new NoteGridExport($id, $nbr),
            $filename,
            \Maatwebsite\Excel\Excel::XLSX,
            [
                'Content-Disposition' => 'attachment; filename="' . $filename . '"',
            ]
        );    }
}
