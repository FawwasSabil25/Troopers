<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class UsersController extends Controller
{
	public function index()
	{
		$users = User::all()->map(function ($u) {
			return [
				'id' => $u->id,
				'name' => $u->name,
				'email' => $u->email,
				'phone' => $u->phone,
				'city' => $u->city,
				'education' => $u->education,
				'university' => $u->university,
				'major' => $u->major,
				'semester' => $u->semester,
				'role' => $u->role,
				'ktp' => $u->ktp,
			];
		});
		return Inertia::render('admin/users', [
			'users' => $users,
		]);
	}

	public function store()
	{
		$data = request()->validate([
			'name' => 'required|string|max:255',
			'email' => 'required|email|unique:users,email',
			'password' => 'required|string|min:8',
			'ktp' => 'required|string|max:32',
			'phone' => 'required|string|max:32',
			'city' => 'required|string|max:64',
			'education' => 'required|string|max:16',
			'university' => 'required|string|max:64',
			'major' => 'required|string|max:64',
			'semester' => 'required|string|max:2',
			'role' => 'required|in:mahasiswa,admin',
		]);
		$data['password'] = bcrypt($data['password']);
		User::create($data);
		return redirect()->route('users.index')->with('success', 'User berhasil ditambahkan');
	}

	public function update($id)
	{
		$user = User::findOrFail($id);
		$data = request()->validate([
			'name' => 'required|string|max:255',
			'email' => 'required|email|unique:users,email,' . $user->id,
			'password' => 'nullable|string|min:8',
			'ktp' => 'required|string|max:32',
			'phone' => 'required|string|max:32',
			'city' => 'required|string|max:64',
			'education' => 'required|string|max:16',
			'university' => 'required|string|max:64',
			'major' => 'required|string|max:64',
			'semester' => 'required|string|max:2',
			'role' => 'required|in:mahasiswa,admin',
		]);
		if (!empty($data['password'])) {
			$data['password'] = bcrypt($data['password']);
		} else {
			unset($data['password']);
		}
		$user->update($data);
		return redirect()->route('users.index')->with('success', 'User berhasil diupdate');
	}

	public function destroy($id)
	{
		$user = User::findOrFail($id);
		$user->delete();
		return redirect()->route('users.index')->with('success', 'User berhasil dihapus');
	}
}
