<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ModuleResource extends JsonResource
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
            "option"=>$this->option->id,
            "title"=>$this->title,
            "key"=>$this->key,
            "duration"=>$this->duration,
            "coefficient"=>$this->coefficient
        ];
    }
}
