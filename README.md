# Internship Application Portal

A web app for listing internship and practical-work (kerja praktik) positions, and for managing applications from submission to review. Students browse positions and apply online; admins review applicants and update their status.

> A prototype built to explore an internship application flow.

## Features

**Public**
- Home page and FAQ
- Listings and detail pages for internship and kerja praktik positions

**Students**
- Register and log in
- Apply to a position with a form and document uploads
- Dashboard to track the status of each application

**Admin**
- Review applicants and update application status
- Add interview and test notes
- Manage user accounts
- Manage position listings (partially implemented)
- Email notification to the applicant when their status changes

## Tech stack

- **Backend:** Laravel 12 (PHP 8.2+), Sanctum
- **Frontend:** React 19, TypeScript, Inertia.js, Tailwind CSS 4, Vite, Radix UI, Headless UI, Lucide
- **Database:** MySQL
- Built on the Laravel React starter kit

## Getting started

Requirements: PHP 8.2+, Composer, Node.js, and a database.

```bash
git clone https://github.com/FawwasSabil25/Troopers.git
cd Troopers
composer install
npm install
cp .env.example .env        # then set your database and mail credentials
php artisan key:generate
php artisan migrate
php artisan storage:link    # [VERIFY: needed for uploaded documents]
composer run dev            # [VERIFY: or run npm run dev and php artisan serve]
```

Status emails use Laravel Mail, so configure the mail settings in `.env` to test them.

## Project status

A prototype, not a production system. Known limitations:

- Some pages are still unfinished (position create and edit forms, account settings pages)
- The FAQ page contains placeholder text

## Author

Fawwas Nawwaf Sabil: [GitHub](https://github.com/FawwasSabil25)
