<?php
namespace App\Imports;

use App\Models\Group;
use App\Models\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithCalculatedFormulas;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Row;

class StudentImport implements ToModel, WithCalculatedFormulas, WithHeadingRow, WithStartRow, OnEachRow
{
    protected $groupCode;

    public function model(array $row)
    {
        $group = Group::where('code', $this->groupCode)->first();

        if ($group) {
            // Create a new Student model instance and fill it with the imported data
            $user = new User();
            $user->cin = $row['cin'];
            $user->first_name = $row['first_name'];
            $user->last_name = $row['last_name'];

            return new User([
                'gender' => $row['gender'],
                'tele' => $row['tele'],
                'address' => $row['address'],
                'birthday' => $row['birthday'],
            ]);
        }

        // Group not found, you can handle this case accordingly
        // For example, skip the row or throw an exception
        return null;
    }

    public function startRow(): int
    {
        return 9; // Starting row of the student data (change it based on your file structure)
    }

    public function headingRow(): int
    {
        return 8; // Row containing the heading "Group :"
    }

    public function onRow(Row $row)
    {
        $this->groupCode = $row->getCell('A8')->getValue(); // Extract the group code from cell A8
    }
}