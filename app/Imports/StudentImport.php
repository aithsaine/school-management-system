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

class StudentImport implements ToModel, WithCalculatedFormulas, WithHeadingRow
{

    public function model(array $row)
    {

            return new User([
                "first_name"=>$row["nom"],
                "last_name"=>$row["prenom"],
                'gender' => $row['gender'],
                'tele' => $row['tele'],
                "email"=>$row["nom"]."@test.mail",
                "password"=>"test",
                'address' => $row['address'],
                'birthday' => $row['birthday'],
                
            ]);
        

        // Group not found, you can handle this case accordingly
        // For example, skip the row or throw an exception
        return null;
    }

    



    
}