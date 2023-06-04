<?php

namespace App\Exports;

use App\Models\Group;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class StudentGridExport implements WithHeadings, WithColumnWidths,  WithStyles
{


    public $group;
    public function __construct($id)
    {
        $this->group = Group::find($id);
    }
    /**
     * @return \Illuminate\Support\Collection
     */


    public function headings(): array
    {
        return [
            [
                'Filiere :',
                $this->group->option->branch->name
            ],
            [
                'Option :',
                $this->group->option->name

            ],
            [
                'Module :',
                "Projet De Stage"
            ],
            [
                "Group :",
                $this->group->id

            ],
            [
                "",
                ""
            ],
            [
                "",
                ""
            ],
            [
                "cin",
                "first_name",
                "last_name",
                "gender",
                "tele",
                "adress",
                "bithday"
            ],

        ];
    }
    public function columnWidths(): array
    {
        return [
            'A' => 25,
            'B' => 25,
            "C" => 15,
            "D" => 15,
            "E" => 15,
            "F" => 15,
            "G" => 15
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
            "B1"    => ['font' => ['bold' => true]],
            "B2"    => ['font' => ['bold' => true]],
            "B3"    => ['font' => ['bold' => true]],
            "B4"    => ['font' => ['bold' => true]],

            // Styling a specific cell by coordinate.

            "A7" => ['font' => ['italic' => true, "bold" => true], 'borders' => [
                'outline' => ['borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM],
                'inside' => ['borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM],
            ]],
            "B7" => ['font' => ['italic' => true, "bold" => true], 'borders' => [
                'outline' => ['borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM],
                'inside' => ['borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM],
            ]],
            "C7" => ['font' => ['italic' => true, "bold" => true], 'borders' => [
                'outline' => ['borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM],
                'inside' => ['borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM],
            ]],
            "D7" => ['font' => ['italic' => true, "bold" => true], 'borders' => [
                'outline' => ['borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM],
                'inside' => ['borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM],
            ]],
            "E7" => ['font' => ['italic' => true, "bold" => true], 'borders' => [
                'outline' => ['borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM],
                'inside' => ['borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM],
            ]],
            "F7" => ['font' => ['italic' => true, "bold" => true], 'borders' => [
                'outline' => ['borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM],
                'inside' => ['borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM],
            ]],
            "G7" => ['font' => ['italic' => true, "bold" => true], 'borders' => [
                'outline' => ['borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM],
                'inside' => ['borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM],
            ]],
            "A8:G33" => [
                'borders' => [
                    'outline' => ['borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN],
                    'inside' => ['borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN],
                ], ['numberFormat' => '00.00']

            ],



            // Styling an entire column.
        ];
    }
}
