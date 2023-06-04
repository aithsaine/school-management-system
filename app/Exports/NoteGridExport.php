<?php

namespace App\Exports;

use App\Models\Affectation;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class NoteGridExport implements FromArray, WithHeadings, WithColumnWidths,  WithStyles
{

    public $affectation;
    public $nbr;
    public function __construct($id,$nbr)
    {
        $this->affectation = Affectation::find($id);
        $this->nbr = $nbr;
    }
    /**
     * @return \Illuminate\Support\Collection
     */
    public function array(): array
    {
        //
        $data = [];
        foreach ($this->affectation->group->students??[] as $std) {
            $data[] = [$std->student_number, $std->user->first_name . " " . $std->user->last_name];
        };
        return $data;
    }

    public function headings(): array
    {
        return [
            [
                'Filiere :',
                $this->affectation->group->option->branch->name
            ],
            [
                'Option :',
                $this->affectation->group->option->name

            ],
            [
                'Module :',
                "Projet De Stage"
            ],
            [
                "controle numero",
                $this->nbr
            ],
            [
                "formateur :",
                $this->affectation->teacher->user->first_name." ".$this->affectation->teacher->user->last_name

            ],
            [
                "",
                ""
            ],
            [
                "",
                ""
            ],
            ["Numero de stagiaire", "Nom Complet", "Note"],

        ];
    }
    public function columnWidths(): array
    {
        return [
            'A' => 25,
            'B' => 25,
            "C" => 15
            
        ];
    }




    public function styles(Worksheet $sheet)
    {


        return [
            // Style the first row as bold text.
            "A1"    => ['font' => ['bold' => true], "border" => true],
            "A2"    => ['font' => ['bold' => true]],
            "A3"    => ['font' => ['bold' => true]],
            "A4"    => ['font' => ['bold' => true]],
            "A5"    => ['font' => ['bold' => true]],
            "B1"    => ['font' => ['bold' => true]],
            "B2"    => ['font' => ['bold' => true]],
            "B3"    => ['font' => ['bold' => true]],
            "B4"    => ['font' => ['bold' => true]],
            "B5"    => ['font' => ['bold' => true]],

            // Styling a specific cell by coordinate.

            "A8" => ['font' => ['italic' => true, "bold" => true], 'borders' => [
                'outline' => ['borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM],
                'inside' => ['borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM],
            ]],
            "B8" => ['font' => ['italic' => true, "bold" => true], 'borders' => [
                'outline' => ['borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM],
                'inside' => ['borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM],
            ]],
            "C8" => ['font' => ['italic' => true, "bold" => true], 'borders' => [
                'outline' => ['borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM],
                'inside' => ['borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM],
            ]],
            "A9:C33" => [
                'borders' => [
                    'outline' => ['borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN],
                    'inside' => ['borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN],
                ], ['numberFormat' => '00.00']

            ],



            // Styling an entire column.
        ];
    }
}
