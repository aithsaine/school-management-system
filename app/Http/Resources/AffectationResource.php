<?php

namespace App\Http\Resources;

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
            "status"=>$this->status
        ];
    }
}
