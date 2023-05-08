<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    use HasFactory;
    protected $fillable = ["option_id","title","key","duration","coefficient"];
    public function option()
    {
        return $this->belongsTo(Option::class) ;
    }
}
