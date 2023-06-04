<?php

namespace App\Exports;

use App\Models\Group;
use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class UserExport implements FromCollection
{
    public $group;
    public function __construct($id)
    {
        $this->group = $id;
        
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        //
        return Group::find($this->group)->students;
    }
}
