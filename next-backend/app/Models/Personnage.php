<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Personnage extends Model
{
    use HasFactory;
    protected $fillable = [ "name" , "nickname" , "naissance" ,  "image" , "famille"];

    public function famille(): BelongsTo
    {
        return $this->BelongsTo(Famille::class, 'famille');
    }
}
