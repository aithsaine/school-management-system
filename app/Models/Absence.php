<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Absence extends Model
{
    use HasFactory;
    protected $fillable = [
        "affectation_id",
        "student_id",
        "date",
        "motif"
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
    public function affectation()
    {
        return $this->belongsTo(Affectation::class);
    }
}
