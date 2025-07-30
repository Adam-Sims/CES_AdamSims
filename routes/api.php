<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\BugController;

Route::post('/bugs', [BugController::class, 'store']);
