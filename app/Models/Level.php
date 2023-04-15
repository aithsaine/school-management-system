<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    use HasFactory;
    public function students()
    {
        return $this->hasMany(Student::class);
    }
    public function groups()
    {
        return $this->hasMany(Group::class);
    }
    public function teachers()
    {
        return $this->hasMany(Teacher::class);
    }
    public function branches()
    {
        return $this->hasMany(Branch::class);
    }
}
