<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Requests\ResetPasswordRequest;
use Illuminate\Support\Facades\Hash;
use App\Services\ActivityLogger;
use App\Services\AuditTrailService;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (! auth()->user()->hasPermission('users.view')) {
            abort(403);
        }

        $search = $request->input('search');

        $users = User::with('role')
            ->when($search, function ($query, $search) {

                $query->where(function ($q) use ($search) {

                    $q->where('name', 'LIKE', "%{$search}%")
                        ->orWhere('email', 'LIKE', "%{$search}%");

                });

            })
            ->get();

        return Inertia::render('Users/Index', [
            'users' => $users,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (! auth()->user()->hasPermission('users.create')) {
            abort(403);
        }

        $roles = Role::all();

        return Inertia::render('Users/Create', [
            'roles' => $roles,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserStoreRequest $request)
    {
        if (! auth()->user()->hasPermission('users.create')) {
            abort(403);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id,
            'status' => $request->status,
        ]);

        // Activity Log
        $description = "Created user: {$user->name}.";

        ActivityLogger::log(
            'Created',
            'User',
            $description
        );

        return redirect()
            ->route('users.index')
            ->with('success', 'User created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        if (! auth()->user()->hasPermission('users.edit')) {
            abort(403);
        }

        $roles = Role::all();

        return Inertia::render('Users/Edit', [
            'user' => $user,
            'roles' => $roles,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        if (! auth()->user()->hasPermission('users.edit')) {
            abort(403);
        }

        $data = $request->validated();

        $oldUser = $user->replicate();

        // Hash new password if provided.
        if (! empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            // Keep existing password.
            unset($data['password']);
        }

        $user->update($data);

        // Activity Log
        AuditTrailService::logUpdate(
            $oldUser,
            $user,
            'User',
            [
                'name' => 'Name',
                'email' => 'Email',
                'role_id' => 'Role',
            ],
            'name'
        );

        return redirect()
            ->route('users.index')
            ->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Activate / Deactivate user.
     */
    public function toggleStatus(User $user)
    {
        if (! auth()->user()->hasPermission('users.edit')) {
            abort(403);
        }

        $user->status = ! $user->status;

        $user->save();

        return redirect()
            ->route('users.index')
            ->with('success', 'User status updated successfully.');
    }

    /**
     * Show reset password form.
     */
    public function showResetPassword(User $user)
    {
        if (! auth()->user()->hasPermission('users.edit')) {
            abort(403);
        }

        return Inertia::render('Users/ResetPassword', [
            'user' => $user,
        ]);
    }

    /**
     * Reset user password.
     */
    public function resetPassword(
        ResetPasswordRequest $request,
        User $user
    ) {
        if (! auth()->user()->hasPermission('users.edit')) {
            abort(403);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return redirect()
            ->route('users.index')
            ->with('success', 'Password reset successfully.');
    }
}