<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $fillable = ["option_id","name"];
    use HasFactory;
    public function option()
    {
        return $this->belongsTo(Option::class);
    }
}
