<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;
    protected $fillable = [
        "student_id",
        "affectation_id",
        "note",
        "control_number"
    ];
    public function affectation()
    {
        return $this->belongsTo(Affectation::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
