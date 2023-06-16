<?php

namespace App\Http\Resources;

use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AffectationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=>$this->id,
            "teacher"=>$this->teacher_id,
            "group"=>$this->group_id,
            "module"=>$this->module_id, 
            "status"=>$this->status,
            "notes"=>array_map(fn($item)=>$item->control_number,Note::where("affectation_id",$this->id)->get(["control_number"])->unique('control_number')->values()->all())
        ];
    }
}
