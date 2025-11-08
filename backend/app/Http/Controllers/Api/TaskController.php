<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TaskRequest;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $query = Task::where('user_id', $request->user()->id);

        if ($request->has('prioritas')) {
            $query->where('prioritas', $request->prioritas);
        }

        if ($request->has('status')) {
            if ($request->status === 'selesai') $query->where('selesai', true);
            if ($request->status === 'belum') $query->where('selesai', false);
        }

        if ($request->has('sort') && $request->sort === 'deadline') {
            $query->orderBy('tanggal_deadline', 'asc');
        }

        return response()->json($query->get());
    }

    public function store(TaskRequest $request)
    {
        $tanggal = $request->tanggal_deadline;

        $butuh = false;
        if (stripos($request->judul, 'urgent') !== false || stripos($request->judul, 'klien') !== false) {
            $butuh = true;
        }

        $judul = "Alam - " . $request->judul;

        $task = Task::create([
            'user_id' => $request->user()->id,
            'judul' => $judul,
            'deskripsi' => $request->deskripsi,
            'tanggal_deadline' => $tanggal,
            'prioritas' => $request->prioritas,
            'butuh_perhatian' => $butuh
        ]);

        return response()->json($task, 201);
    }

    public function selesaikan($id, Request $request)
    {
        $task = Task::where('user_id', $request->user()->id)->findOrFail($id);
        $task->update(['selesai' => true]);
        return response()->json(['message' => 'Task ditandai selesai']);
    }

    public function reminder(Request $request)
    {
        $besok = Carbon::now('Asia/Jakarta')->addDay()->toDateString();

        $tasks = Task::where('user_id', $request->user()->id)
            ->whereDate('tanggal_deadline', $besok)
            ->get();

        return response()->json($tasks);
    }
}
