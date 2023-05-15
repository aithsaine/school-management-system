<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    use HasFactory;
    protected $fillable = ["branch_id", "name", "season", "key"];
    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }
    public function modules()
    {
        return $this->hasMany(Module::class);
    }
    public function groups()
    {
        return $this->hasMany(Group::class);
    }
}
