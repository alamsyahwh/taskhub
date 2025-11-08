<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'judul', 'deskripsi', 'tanggal_deadline',
        'prioritas', 'selesai', 'butuh_perhatian'
    ];

    protected $casts = [
        'selesai' => 'boolean',
        'butuh_perhatian' => 'boolean',
        'tanggal_deadline' => 'date:Y-m-d'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
