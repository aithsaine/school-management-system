<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Affectation extends Model
{
    use HasFactory;
    protected $fillable = ["teacher_id", "group_id", "module_id", "status"];

    public function group()
    {
        return $this->belongsTo(Group::class);
    }
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
    public function module()
    {
        return $this->belongsTo(Module::class);
    }
    public function notes()
    {
        return $this->hasMany(Note::class);
    }
}
