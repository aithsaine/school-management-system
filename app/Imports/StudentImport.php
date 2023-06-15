<?php
namespace App\Imports;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithMappedCells;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\HeadingRowImport;

class StudentImport  implements ToModel,WithHeadingRow
{
   
    public function headingRow(): int
    {
        return 5;
    }
  
    public function model(array $row)
    {
        //   return User::create([
        //     "cin"=>""
        //   ]);
        print_r($row);
        
    }

    



    
}