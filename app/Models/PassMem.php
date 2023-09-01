<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PassMem extends Model
{
    protected $fillable = [
        'title',
        'passHash'
    ];

    protected $dateFormat = 'Y-m-d H:i:s';
}
